package hu.flowacademy.companycalendar.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;




@Service
public class MailGunEmailService implements EmailService {

    private RESTClient springRestClient;
    private String password;
    private String messagesUrl;
    private String username;

    @Autowired
    public MailGunEmailService(RESTClient springRestClient, String mailGunAPIMessagesUrl, String mailGunAPIUsername,
                               String mailGunAPIPassword) {
        this.springRestClient = springRestClient;
        this.username = mailGunAPIUsername;
        this.password = mailGunAPIPassword;
        this.messagesUrl = mailGunAPIMessagesUrl;
    }

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