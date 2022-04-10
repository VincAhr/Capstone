package de.ahrens.backend;


import de.ahrens.backend.stock.StockData;
import de.ahrens.backend.user.model.LoginCreationData;
import de.ahrens.backend.user.model.Token;
import de.ahrens.backend.user.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;


import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StockControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    private final LoginCreationData registeredUser = new LoginCreationData("1", "1", "1");
    final private StockData stock = new StockData("AAPL");

    @Test
    void integrationTest() {
        // should add a stock

        //GIVEN
        restTemplate.postForEntity("/api/user", registeredUser, User.class);
        ResponseEntity<Token> tokenResponseEntity = restTemplate.postForEntity("/api/user/login", registeredUser, Token.class);
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

