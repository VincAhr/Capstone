package de.ahrens.backend.stock;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "stocks")
public class StockData {

    private String symbol;
    private String close;
    private String user;


    public StockData(String symbol) {
        this.symbol = symbol;
    }




}
