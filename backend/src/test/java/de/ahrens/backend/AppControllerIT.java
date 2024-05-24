package de.ahrens.backend;


import de.ahrens.backend.stock.Eod;
import de.ahrens.backend.stock.Stock;
import de.ahrens.backend.user.model.LoginCreationData;
import de.ahrens.backend.user.model.LoginData;
import de.ahrens.backend.user.model.Token;
import de.ahrens.backend.user.model.UserModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;


import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AppControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void integrationTest() {

        List<Eod> eod = new ArrayList<>();
        eod.add(new Eod());

        final LoginCreationData registerUser = new LoginCreationData("peter", "peter", "peter");
        final LoginData loginUser = new LoginData("peter", "peter");
        final Stock stock = new Stock("1", "AAPL", "Apple", "user", "1", "2", eod);

        // register user
        assertThat(restTemplate.postForEntity("/api/user/register", registerUser, UserModel.class).getStatusCode()).isEqualTo(HttpStatus.OK);

        // login user
        ResponseEntity<Token> tokenResponseEntity = restTemplate.postForEntity("/api/user/login", loginUser, Token.class);
        assertThat(tokenResponseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        // should add a stock

        //GIVEN
        String token = tokenResponseEntity.getBody().getToken();

        //WHEN
        ResponseEntity<Stock> actualResponse = restTemplate.exchange("/stock",
                HttpMethod.POST,
                new HttpEntity<>(stock, createHeaders(token)), Stock.class);

        //THEN
        assertEquals(HttpStatus.OK,actualResponse.getStatusCode());
        Stock actual = actualResponse.getBody();
        assertEquals(stock.getSymbol(),actual.getSymbol());;

    }

    private HttpHeaders createHeaders(String token){
        String authHeader = "Bearer " + token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        return headers;
    }
}
