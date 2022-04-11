package de.ahrens.backend.user;


import de.ahrens.backend.user.model.LoginCreationData;
import de.ahrens.backend.user.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

 private final UserRepo userRepo;

    public Optional<UserModel> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public UserModel createUser(LoginCreationData loginCreationData) {
        if (findByUsername(loginCreationData.getUsername()).isPresent()){
            throw new IllegalArgumentException("Nutzername ist vergeben");
        }
        UserModel newUser = new UserModel();
        newUser.setUsername(loginCreationData.getUsername());
        newUser.setPassword(loginCreationData.getPassword());
        return userRepo.save(newUser);
    }

}
