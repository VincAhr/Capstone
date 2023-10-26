package de.ahrens.backend.stock;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends MongoRepository<StockDTO, String> {

    List<StockDTO> findAllByUser(String user);
    Optional<StockDTO> findByIdAndUser(String id, String user);
}
