package hu.flowacademy.companycalendar.email;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

public class MGSSample {
    private static final String DOMAIN_NAME = "sandbox2b4aedba15744847a5e9bbf5f3343ad3.mailgun.org";
    private static final String API_KEY = "153921d9876a2b20a5a4a250f457fc0f-52b6835e-1ccab418";

    // ...

    public static JsonNode sendSimpleMessage() throws UnirestException {
        System.out.println("Send e-mail");
         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + DOMAIN_NAME + "/messages")
			.basicAuth("api", API_KEY)
                .queryString("from", "ccalendar30@gmail.com")
                .queryString("to", "ccalendar30@gmail.com")
                .queryString("subject", "hello")
                .queryString("text", "testing")
                .asJson();
        return request.getBody();
    }
}