package com.example.demo.stock;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class ApiController {

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


