package com.example.demo.user;

import com.example.demo.security.JwtService;
import com.example.demo.user.model.LoginCreationData;
import com.example.demo.user.model.LoginData;
import com.example.demo.user.model.Token;
import com.example.demo.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @PostMapping
    public User postNewUser (@RequestBody LoginCreationData loginCreationData){
        if (!loginCreationData.getPassword().equals(loginCreationData.getPasswordAgain())){
            throw new IllegalArgumentException("Passwörter müssen identisch sein, bitte wiederholen!");
        }
        loginCreationData.setPassword(passwordEncoder.encode(loginCreationData.getPassword()));
        return userService.createUser(loginCreationData);
    }

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody LoginData loginData) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword()));
        return ResponseEntity.ok(new Token(jwtService.createToken(new HashMap<>(), loginData.getUsername())));
    }

}
