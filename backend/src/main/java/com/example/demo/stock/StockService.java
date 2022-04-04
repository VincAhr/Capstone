package com.example.demo.stock;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;


@Service
@RequiredArgsConstructor
public class StockService {

    @Value("${marketstack_pasword}") String pw;
    private final StockRepository stockRepository;

    public StockData searchStock (String stockName) {

        String url =  "http://api.marketstack.com/v1/eod?access_key="+pw+"&limit=14&symbols="+stockName;

        ResponseEntity<Stock> response = new RestTemplate().getForEntity(url, Stock.class);
        return Objects.requireNonNull(response.getBody()).getData().get(0);

    }


    public StockData addStock(StockData newStock) {
        return stockRepository.save(newStock);
    }
}
