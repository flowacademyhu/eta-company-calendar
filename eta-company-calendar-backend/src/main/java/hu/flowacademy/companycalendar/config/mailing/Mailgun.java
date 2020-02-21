package hu.flowacademy.companycalendar.config.mailing;

import lombok.Data;

@Data
public class Mailgun {
    private String apiKey;
    private String mailSenderUrl;
}
