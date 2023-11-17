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
public class StockDTO {

    @Id
    private String id;

    private String symbol;
    private String name;
    private String user;
    private String shares;
    private String purchase;
    private String close;
    private String date;
    private String note;
    private String stockExchange;


    public StockDTO(String name, String symbol, String close, String date) {
        this.name = name;
        this.symbol = symbol;
        this.close = close;
        this.date = date;
    }
}
