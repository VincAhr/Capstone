package com.example.demo;


import com.example.demo.stock.StockData;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StockControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

//    @Test
//    @Disabled
//    void integrationTest() {
//        // Testing  addStock
//        StockData stock = new StockData("AAPL");
//
//        ResponseEntity<StockData[]> response1 = restTemplate.postForEntity("/api/stock", stock, StockData[].class);
//
//        assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.CREATED);
//        Assertions.assertThat(response1.getBody()).containsExactlyInAnyOrder(stock);
//
//        restTemplate.delete("/api/stock");
//
//
//    }

    }

