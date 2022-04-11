package de.ahrens.backend;


import de.ahrens.backend.stock.StockData;
import de.ahrens.backend.user.model.LoginCreationData;
import de.ahrens.backend.user.model.LoginData;
import de.ahrens.backend.user.model.Token;
import de.ahrens.backend.user.model.UserModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AppControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    private final LoginCreationData registerUser = new LoginCreationData("peter", "peter", "peter");
    private final LoginData loginUser = new LoginData("peter", "peter");
    private final StockData stock = new StockData("AAPL", "test");

    @Test
    void integrationTest() {

        // register user
        assertThat(restTemplate.postForEntity("/api/user", registerUser, UserModel.class).getStatusCode()).isEqualTo(HttpStatus.OK);

        // login user
        assertThat(restTemplate.postForEntity("/api/user/login", loginUser, LoginData.class).getStatusCode()).isEqualTo(HttpStatus.OK);


        // should add a stock

        //GIVEN
        restTemplate.postForEntity("/api/user", registerUser, UserModel.class);
        ResponseEntity<Token> tokenResponseEntity = restTemplate.postForEntity("/api/user/login", registerUser, Token.class);
        String token = tokenResponseEntity.getBody().getToken();

        //WHEN
        ResponseEntity<StockData> actualResponse = restTemplate.exchange("/api/stock",
                HttpMethod.POST,
                new HttpEntity<>(stock, createHeaders(token)), StockData.class);

        //THEN
        assertEquals(HttpStatus.OK,actualResponse.getStatusCode());
        StockData actual = actualResponse.getBody();
        assertEquals(stock.getSymbol(),actual.getSymbol());;

    }

    private HttpHeaders createHeaders(String token){
        String authHeader = "Bearer " + token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);

        return headers;
    }

    }

