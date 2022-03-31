package com.example.demo.stock;


import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@Data
public class ApiController {

 private final StockService stockservice;


@GetMapping("/{symbol}")
  public Stockdata getSearchForStock(@PathVariable String symbol) {
  return stockservice.searchStock(symbol);
 }

}
