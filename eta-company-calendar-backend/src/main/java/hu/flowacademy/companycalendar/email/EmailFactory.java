package hu.flowacademy.companycalendar.email;

import hu.flowacademy.companycalendar.config.mailing.MailingConfig;
import hu.flowacademy.companycalendar.constants.Constants;
import java.util.AbstractMap.SimpleEntry;
import java.util.Map.Entry;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@AllArgsConstructor
public class EmailFactory {
  private final MailingConfig mailingConfig;

  public MultiValueMap<String, String> buildEmail(String from, String to, String subject,
      EmailType emailType, Object... bodyParams) {
    MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
    requestData.add("from", from);
    requestData.add("to", to);
    requestData.add("subject", subject);
    var body = buildContent(emailType, bodyParams);
    requestData.add(body.getKey(), body.getValue());
    return requestData;
  }

  public Entry<String, String> buildContent(EmailType emailType, Object... params) {
    if (EmailType.TEXT.equals(emailType)) {
      if (params == null) {
        return new SimpleEntry<>(Constants.TYPE_TEXT, mailingConfig.getNewMessageTemplate());
      }
      return new SimpleEntry<>(Constants.TYPE_TEXT,
          String.format(mailingConfig.getNewMessageTemplate(), params));
    } else if (EmailType.HTML.equals(emailType)) {
      return new SimpleEntry<>(Constants.TYPE_HTML, String.format(mailingConfig.getNewMessageTemplate(), params));
    }
    throw new IllegalArgumentException(Objects.toString(emailType));


  }
}