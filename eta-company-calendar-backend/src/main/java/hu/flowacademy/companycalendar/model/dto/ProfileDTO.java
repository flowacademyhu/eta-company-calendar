package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;


@Component
@Data
@NoArgsConstructor
public class ProfileDTO {

  private String firstName;
  private String lastName;
  private String leader;
  private String department;
  private String position;
  private String team;


  public ProfileDTO(Profile profile) {
    if (profile.getUser() == null) {
      throw new IllegalArgumentException("User cannot be null!");
    }

    this.firstName = profile.getFirstName();
    this.lastName = profile.getLastName();
    this.department = profile.getDepartment();
    this.position = profile.getPosition();
    this.team = profile.getTeam();
    this.leader = profile.getLeader();
  }

  public Profile toEntity(User user) {
    Profile profile = Profile.builder().user(user).build();
    BeanUtils.copyProperties(this, profile);
    profile.setUser(user);
    return profile;
  }
}
