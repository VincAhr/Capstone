package com.example.demo;

import com.example.demo.user.UserRepo;
import com.example.demo.user.UserService;
import com.example.demo.user.model.LoginCreationData;
import com.example.demo.user.model.User;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Test
    void createUser() {
        LoginCreationData loginCreationData = new LoginCreationData("intelli", "j", "j");
        User user = new User(null, "intelli", "j");
        User savedUser = new User("0000", "intelli", "j");

        UserRepo userRepo = mock(UserRepo.class);
        when(userRepo.save(user)).thenReturn(savedUser);

        UserService userService = new UserService(userRepo);
        User actual = userService.createUser(loginCreationData);

        assertThat(actual).isSameAs(savedUser);
    }

        @Test
        void shouldFindByUsername() {
            User user = new User("2", "intelli", "j");

            UserRepo userRepo = mock(UserRepo.class);
            when(userRepo.findByUsername("intelli")).thenReturn(Optional.of(user));

            UserService userService = new UserService(userRepo);

            assertThat(userService.findByUsername("intelli")).contains(user);

        }

    }
