package hu.flowacademy.companycalendar.email;

import hu.flowacademy.companycalendar.config.mailing.MailingConfig;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@Service
@AllArgsConstructor
public class MailGunEmailService implements EmailService {
    private final MailingConfig mailingConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public void sendText(String from, String to, String subject, String body) {
        MultiValueMap<String, String> map = getPostRequestObject(from, to, subject);
        map.add("text", body);
    }

    @Override
    public void sendHTML(String from, String to, String subject, String body) {
        MultiValueMap<String, String> map = getPostRequestObject(from, to, subject);
        map.add("html", body);
    }

    // csak a funkciót valósítsuk meg, ne legyen benne semmilyen egyéb logika (templating)
    //@PostConstruct
    private void sendEmail(String to, String subject, String body) {
        String user = "Feri";
        String startTime = "14:00";
        String finishTime = "16:00";
        String meetingRoom = "1. sz.";

        // üzenet összerakása
        String message = String.format(
                mailingConfig.getMessageTemplate(),
                user,
                startTime,
                finishTime,
                meetingRoom
        ); // helyettesíthető MessageFormat-tal "Hello {0}, értekezleted van {1} ... "

        // HTTP header összerakása: basic auth és contentType megadása
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("api", mailingConfig.getMailgun().getApiKey());

        // form data megadása
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("from", mailingConfig.getMailFrom());
        map.add("to", to);
        map.add("subject", subject);
        map.add("text", message); // csere body-ra

        // http entity (request) object összerakása
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        // kérés elküldése
        ResponseEntity<String> response = restTemplate.postForEntity(mailingConfig.getMailgun().getMailSenderUrl(),
                request, String.class);

        System.out.println(response);
    }

    private MultiValueMap<String, String> getPostRequestObject(String from, String to, String subject) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("from", from);
        map.add("to", to);
        map.add("subject", subject);
        return map;
    }

}