package hu.flowacademy.companycalendar.config;

import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

@Slf4j
public class CustomTokenEnhancer implements TokenEnhancer {

  @Autowired
  private UserRepository userRepository;

  @Override
  public OAuth2AccessToken enhance(OAuth2AccessToken token,
      OAuth2Authentication auth) {
    Object principal = auth.getPrincipal();
    if (principal instanceof User) {
      var user = (User) principal;
      ((DefaultOAuth2AccessToken) token).setAdditionalInformation(
          Map.of("id", user.getId()));
      return token;
    }
    log.error("Principal is not User.class");
   return token;
  }
}
