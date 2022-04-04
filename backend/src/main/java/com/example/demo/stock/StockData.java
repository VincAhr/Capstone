package com.example.demo.stock;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "stocks")
public class StockData {

    private String symbol;
    private String close;


}
