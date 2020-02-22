package hu.flowacademy.companycalendar.config;

import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

public class CustomTokenEnhancer implements TokenEnhancer {

  @Autowired
  private UserRepository userRepository;

  @Override
  public OAuth2AccessToken enhance(OAuth2AccessToken token,
      OAuth2Authentication auth) {
    Map<String, Object> additionalInfo = new HashMap<>();
    additionalInfo.put("id", userRepository.findFirstByEmail(auth.getName()).orElseThrow().getId());
    ((DefaultOAuth2AccessToken) token).setAdditionalInformation(
        additionalInfo);
    return token;
  }
}
