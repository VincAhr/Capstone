package de.ahrens.backend.stock;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends MongoRepository<StockData, String> {

    public List<StockData> findAllByUser(String user);
}
