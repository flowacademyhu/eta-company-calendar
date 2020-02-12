package hu.flowacademy.companycalendar.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@FrameworkEndpoint
public class RevokeTokenEndpoint {

  @Resource(name = "tokenServices")
  private ConsumerTokenServices tokenServices;

  @DeleteMapping("/oauth/token/revoke/")
  @ResponseBody
  public ResponseEntity<Void> revokeToken(HttpServletRequest request) {
    String authorization = request.getHeader("Authorization");
    if (authorization != null && authorization.contains("Bearer")) {
      String tokenId = authorization.substring("Bearer".length() + 1);
      if (tokenServices.revokeToken(tokenId)) {
        return ResponseEntity.ok().build();
      } else {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
    }
    return ResponseEntity.noContent().build();
  }

}
