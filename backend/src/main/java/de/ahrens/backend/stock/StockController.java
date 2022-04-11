package de.ahrens.backend.stock;



import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@AllArgsConstructor
public class StockController {

    private final StockService stockservice;


    @GetMapping("/{symbol}")
    public StockData getSearchForStock(@PathVariable String symbol) {
        return stockservice.searchStock(symbol);
    }

    @PostMapping
    public StockData postNewStock(@RequestBody StockData newStock){
       return stockservice.addStock(newStock);
    }


}


