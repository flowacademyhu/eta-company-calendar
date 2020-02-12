package hu.flowacademy.companycalendar.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailGunConfig {

    @Value("${mailgun.api.username}") String mailGunAPIUsername;
    @Value("${mailgun.api.password}") String mailGunAPIPassword;
    @Value("${mailgun.api.base.url}") String mailGunAPIBaseUrl;
    @Value("${mailgun.api.messages.url}") String mailGunAPIMessagesUrl;


    public String mailGunAPIUsername() {
        return this.mailGunAPIUsername;
    }

    public String mailGunAPIPassword() {
        return this.mailGunAPIPassword;
    }

    public String mailGunAPIBaseUrl() {
        return this.mailGunAPIBaseUrl;
    }

    public String mailGunAPIMessagesUrl() {
        return this.mailGunAPIMessagesUrl;
    }
}