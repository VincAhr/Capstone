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
    public StockDTO getStock(@PathVariable String symbol) {
        return stockservice.searchStock(symbol);
    }

    @GetMapping()
    public List<StockDTO> getAllStocks(Principal principal) {
        return stockservice.getAllSaved(principal);
    }

    @PostMapping
    public StockDTO postNewStock(@RequestBody StockDTO newStock, Principal principal){
       return stockservice.addStock(newStock, principal);
    }

    @PutMapping
    public StockDTO updateStock(@RequestBody StockDTO stockData, Principal principal){
        return stockservice.updateStock(stockData, principal);
    }

    @DeleteMapping("/{id}")
    public StockDTO deleteStockById(@PathVariable String id, Principal principal){
        return stockservice.deleteStock(id, principal);
    }


}


