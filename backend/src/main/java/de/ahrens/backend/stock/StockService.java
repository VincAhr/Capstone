package de.ahrens.backend.stock;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.security.Principal;
import java.util.*;


@Service
@RequiredArgsConstructor
public class StockService {

    @Value("${app.marketstack.password}")
    String pw;

    private final StockRepository stockRepository;


    public StockDTO searchStock(String searchInput, String stockExchange) {

        final String SEARCH_STOCK = "http://api.marketstack.com/v1/tickers?access_key=" + pw + "&search=" + searchInput + "&limit=1";

        try {

            if (!stockExchange.isEmpty()) {
                stockExchange = ("XFRA");
            } else { stockExchange = "";}

            ResponseEntity<String> response = new RestTemplate().getForEntity(SEARCH_STOCK + "&exchange=" + stockExchange, String.class);

            if (response.getBody() != null && response.getStatusCode() == HttpStatus.OK) {

                JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();

                if (!jsonObject.getAsJsonArray("data").isEmpty()) {

                    JsonElement data = jsonObject.getAsJsonArray("data").get(0);
                    String symbol = data.getAsJsonObject().get("symbol").getAsString();
                    //String stockExchange = data.getAsJsonObject().get("stock_exchange").getAsString();

                    if (symbol != null) {
                        final String API_TICKER_URL = "http://api.marketstack.com/v1/tickers/" + symbol + "/eod?access_key=" + pw + "&limit=1";

                        ResponseEntity<StockData> eodResponse = new RestTemplate().getForEntity(API_TICKER_URL, StockData.class);

                        if (eodResponse.getBody() != null && eodResponse.getStatusCode() == HttpStatus.OK) {

                            Stock stock = eodResponse.getBody().getData();

                            String name = stock.getName();
                            if (!stock.getEod().isEmpty()) {
                                String close = String.valueOf(stock.getEod().get(0).getClose());
                                String date = String.valueOf(stock.getEod().get(0).getDate());

                                return new StockDTO(name, symbol, close, date);
                            } else {
                                return new StockDTO(name, symbol, null, null);
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    return new StockDTO(searchInput, null, null, null);
                }
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public StockDTO addStock(StockDTO newStock, Principal principal) {
        newStock.setUser(principal.getName());
        return stockRepository.save(newStock);
    }

    public StockDTO updateStock(StockDTO stockData, Principal principal) {
        if (stockRepository.findById(stockData.getId()).isPresent()) {
            stockData.setUser(principal.getName());
            stockRepository.save(stockData);
        }
        return stockData;
    }

    public List<StockDTO> getAllSaved(Principal principal) {
        if (principal != null && !principal.getName().isBlank()) {
            return stockRepository.findAllByUser(principal.getName());
        } else {
            return null;
        }
    }

    public StockDTO getStock(String id, Principal user) throws IllegalArgumentException {

        if (stockRepository.findById(id).isPresent()) {
            return stockRepository.findStockDTOByIdAndUser(id, user.getName());
        } else {
            throw new IllegalArgumentException("Nothing found with Id: " + id);
        }
    }


    public List<String[]> saveCsvToDb(MultipartFile file, Principal principal) {

        try {
            CSVParser parser = new CSVParserBuilder().withSeparator(';').withIgnoreQuotations(true).build();
            CSVReader csvReader = new CSVReaderBuilder(new InputStreamReader(file.getInputStream())).withCSVParser(parser).withSkipLines(1).build();
            List<String[]> stockData = csvReader.readAll();


            for (String[] stock : stockData) {

                StockDTO stockDTO = new StockDTO();

                if (stock.length > 0) {

                    stockDTO.setUser(principal.getName());

                    stockDTO.setShares(String.valueOf((Arrays.stream(stock).toArray())[0]));
                    stockDTO.setName(String.valueOf((Arrays.stream(stock).toArray())[1]));
                    stockDTO.setNote(String.valueOf((Arrays.stream(stock).toArray())[2]));
                    stockDTO.setStockExchange(String.valueOf((Arrays.stream(stock).toArray())[14]));
                    stockDTO.setPurchase(String.valueOf((Arrays.stream(stock).toArray())[15]));

                    StockDTO searchStock =  searchStock(String.valueOf((Arrays.stream(stock).toArray())[1]).substring(0, 10), (stockDTO.getStockExchange()));

                    if (searchStock != null) {
                        stockDTO.setName(searchStock.getName());
                        stockDTO.setSymbol(searchStock.getSymbol());
                        stockDTO.setClose(searchStock.getClose());
                        stockDTO.setDate(searchStock.getDate());

                        if (stockRepository.findByNameAndUser(searchStock.getName(), principal.getName()).isEmpty()) {
                            stockRepository.save(stockDTO);
                        }
                    }
                }
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteStock(String idToDelete, Principal principal) {
        Optional<StockDTO> stock = stockRepository.findByIdAndUser(idToDelete, principal.getName());
        StockDTO stockData = stock.orElseThrow(() -> new IllegalArgumentException("Nothing found with Id: " + idToDelete));
        stockRepository.delete(stockData);
    }
}
