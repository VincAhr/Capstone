package com.example.demo.user;


import com.example.demo.user.model.LoginCreationData;
import com.example.demo.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

 private final UserRepo userRepo;

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User createUser(LoginCreationData loginCreationData) {
        if (findByUsername(loginCreationData.getUsername()).isPresent()){
            throw new IllegalArgumentException("Nutzername ist vergeben");
        }
        User newUser = new User();
        newUser.setUsername(loginCreationData.getUsername());
        newUser.setPassword(loginCreationData.getPassword());
        return userRepo.save(newUser);
    }

}
