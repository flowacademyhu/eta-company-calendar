package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

  private Long id;
  private String email;
  private Roles role;
  private String name;
  private String leaderName;
  private String leaderEmail;

  public UserResponseDTO(User user) {
    this.id = user.getId();
    this.email = user.getEmail();
    this.role = user.getRole();
    this.name = user.getName();
    if(user.getLeader() != null){
      this.leaderName = user.getLeader().getName();
      this.leaderEmail = user.getLeader().getEmail();
    }
  }

}
