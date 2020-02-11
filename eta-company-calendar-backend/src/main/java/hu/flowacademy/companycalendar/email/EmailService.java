package hu.flowacademy.companycalendar.email;

import org.springframework.util.MultiValueMap;

public interface EmailService {
    void sendText(String from, String to, String subject, String body);
    void sendHTML(String from, String to, String subject, String body);

}