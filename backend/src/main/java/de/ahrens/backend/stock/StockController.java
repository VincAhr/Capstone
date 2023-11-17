package de.ahrens.backend.stock;


import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.io.InputStreamReader;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/stock")
@AllArgsConstructor
public class StockController {

    private final StockService stockservice;


    @GetMapping("/api/{symbol}")
    public StockDTO getStockFromApi(@PathVariable String symbol) {
        return stockservice.searchStock(symbol);
    }

    @GetMapping("/{id}")
    public StockDTO getStock(@PathVariable String id, Principal principal) {
        return stockservice.getStock(id, principal);
    }

    @GetMapping("/all")
    public List<StockDTO> getAllStocks(Principal principal) {
        return stockservice.getAllSaved(principal);
    }

    @PostMapping
    public StockDTO postNewStock(@RequestBody StockDTO newStock, Principal principal) {
        return stockservice.addStock(newStock, principal);
    }

    @PutMapping
    public StockDTO updateStock(@RequestBody StockDTO stockData, Principal principal) {
        return stockservice.updateStock(stockData, principal);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStockById(@PathVariable String id, Principal principal) {
        stockservice.deleteStock(id, principal);
    }


    @PostMapping(value = "/csv", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public List<String[]> saveCsv(@RequestParam("file") MultipartFile file, Principal principal) {
        return stockservice.saveCsvToDb(file, principal);
    }
}


