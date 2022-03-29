package com.example.demo.stock;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Stock {

    private List<Stockdata> data = new ArrayList<>();

}
