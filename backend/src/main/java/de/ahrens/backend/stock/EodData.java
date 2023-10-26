package de.ahrens.backend.stock;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EodData {

    List<Eod> eod = new ArrayList<>();

}
