package de.ahrens.backend.user;

import de.ahrens.backend.user.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {
     Optional<UserModel> findByUsername(String username);
}
