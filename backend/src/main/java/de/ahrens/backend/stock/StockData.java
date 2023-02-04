package de.ahrens.backend.stock;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "stocks")
public class StockData {

    @Id
    private String id;

    private String symbol;
    private String close;
    private String user;
    private String shares;
    private String date;
    private String purchase;



    public StockData(String symbol) {
        this.symbol = symbol;
    }




}
