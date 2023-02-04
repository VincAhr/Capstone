package de.ahrens.backend.stock;



import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@AllArgsConstructor
public class StockController {

    private final StockService stockservice;


    @GetMapping("/{symbol}")
    public StockData getSearchForStock(@PathVariable String symbol) {
        return stockservice.searchStock(symbol);
    }

    @GetMapping()
    public List<StockData> getAllStocks(Principal principal) {
        return stockservice.getAllSaved(principal);
    }

    @PostMapping
    public StockData postNewStock(@RequestBody StockData newStock, Principal principal){
       return stockservice.addStock(newStock, principal);
    }

    @PutMapping
    public StockData updateStock(@RequestBody StockData stockData, Principal principal){
        return stockservice.updateStock(stockData, principal);
    }

    @DeleteMapping("/{id}")
    public StockData deleteStockById(@PathVariable String id, Principal principal){
        return stockservice.deleteStock(id, principal);
    }


}


