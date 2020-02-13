package hu.flowacademy.companycalendar.email;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
@RequiredArgsConstructor
public class MailGunEmailService implements EmailService {

    @NonNull
    private RESTClient springRestClient;
    @Value("${mailgun.api.username}") String username;
    @Value("${mailgun.api.password}") String password;
    @Value("${mailgun.api.messages.url}") String messagesUrl;
    @Value("${mailgun.api.base.url}") String mailGunAPIMessagesUrl;

    @Override
    public void sendText(String from, String to, String subject, String body) {
        MultiValueMap<String, String> map = getPostRequestObject(from, to, subject);
        map.add("text", body);
        sendEmail(map);
    }

    @Override
    public void sendHTML(String from, String to, String subject, String body) {
        MultiValueMap<String, String> map = getPostRequestObject(from, to, subject);
        map.add("html", body);
        sendEmail(map);
    }

    private void sendEmail(MultiValueMap<String, String> map) {
            this.springRestClient.post(this.messagesUrl, map, this.username, this.password);
    }

    private MultiValueMap<String, String> getPostRequestObject(String from, String to, String subject) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("from", from);
        map.add("to", to);
        map.add("subject", subject);
        return map;
    }

}