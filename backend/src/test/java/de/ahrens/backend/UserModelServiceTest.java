package de.ahrens.backend;

import de.ahrens.backend.user.UserRepo;
import de.ahrens.backend.user.UserService;
import de.ahrens.backend.user.model.LoginCreationData;
import de.ahrens.backend.user.model.UserModel;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserModelServiceTest {

    @Test
    void createUser() {
        LoginCreationData loginCreationData = new LoginCreationData("intelli", "j", "j");
        UserModel user = new UserModel(null, "intelli", "j");
        UserModel savedUser = new UserModel("0000", "intelli", "j");

        UserRepo userRepo = mock(UserRepo.class);
        when(userRepo.save(user)).thenReturn(savedUser);

        UserService userService = new UserService(userRepo);
        UserModel actual = userService.createUser(loginCreationData);

        assertThat(actual).isSameAs(savedUser);
    }

        @Test
        void shouldFindByUsername() {
            UserModel user = new UserModel("2", "intelli", "j");

            UserRepo userRepo = mock(UserRepo.class);
            when(userRepo.findByUsername("intelli")).thenReturn(Optional.of(user));

            UserService userService = new UserService(userRepo);

            assertThat(userService.findByUsername("intelli")).contains(user);

        }

    }
