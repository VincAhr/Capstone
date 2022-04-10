package de.ahrens.backend.user.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginCreationData {

    private String username;
    private String password;
    private String passwordAgain;

}
