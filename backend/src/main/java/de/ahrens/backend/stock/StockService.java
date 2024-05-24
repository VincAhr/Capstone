package de.ahrens.backend.stock;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;



@Service
@RequiredArgsConstructor
public class StockService {

    @Value("${app.marketstack.password}")
    String pw;

    private final StockRepository stockRepository;


    public StockDTO searchStock(String searchInput) throws Exception {

        final String SEARCH_STOCK = "http://api.marketstack.com/v1/tickers?access_key=" + pw + "&search=" + searchInput + "&limit=1";

        try {

            ResponseEntity<String> response = new RestTemplate().getForEntity(SEARCH_STOCK, String.class);

            if (response.getBody() != null && response.getStatusCode() == HttpStatus.OK) {

                JsonObject jsonObject = JsonParser.parseString(Objects.requireNonNull(response.getBody())).getAsJsonObject();
                JsonElement data = jsonObject.getAsJsonArray("data").get(0);
                String symbol = data.getAsJsonObject().get("symbol").getAsString();

                if (symbol != null) {

                    final String API_TICKER_URL = "http://api.marketstack.com/v1/tickers/" + symbol + "/eod?access_key=" + pw + "&limit=1";

                    ResponseEntity<StockData> eodResponse = new RestTemplate().getForEntity(API_TICKER_URL, StockData.class);

                    if (eodResponse.getBody() != null && eodResponse.getStatusCode() == HttpStatus.OK) {

                        Stock stock = eodResponse.getBody().getData();

                        String name = stock.getName();
                        String close = String.valueOf(stock.getEod().get(0).getClose());
                        String date = String.valueOf(stock.getEod().get(0).getDate());

                        return new StockDTO(name, symbol, close, date);

                    } else {return null;
                    }
                } else {return null;
                }
            } else  { return null;
            }
        } catch (Exception e) {
            throw new Exception(e);
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
        if (principal != null &&  !principal.getName().isBlank()) {
            return stockRepository.findAllByUser(principal.getName());
        } else {
            return null;
        }
    }

    public void deleteStock(String idToDelete, Principal principal) {
        Optional<StockDTO> stock = stockRepository.findByIdAndUser(idToDelete, principal.getName());
        StockDTO stockData = stock.orElseThrow(() -> new IllegalArgumentException("Nothing found with Id: " + idToDelete));
        stockRepository.delete(stockData);
    }

    public StockDTO getStock(String id, Principal user) throws IllegalArgumentException {

        if (stockRepository.findById(id).isPresent()) {
            return stockRepository.findStockDTOByIdAndUser(id, user.getName());
        }
         else {
             throw new IllegalArgumentException("Nothing found with Id: " + id);
         }
    }
}
