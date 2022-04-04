package com.example.demo.stock;


import org.springframework.data.mongodb.core.mapping.Document;

@lombok.Data
@Document(collection = "stocks")
public class StockData {

    private String symbol;
    private String close;


}
