package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
@Data
@NoArgsConstructor
public class ProfileDTO {

  private long userId;
  private String firstName;
  private String lastName;
  private LocalDate dateOfBirth;
  private LocalDate dateOfEntry;
  private String department;
  private String position;
  private String team;


  public ProfileDTO(Profile profile) {
    if (profile.getUser() == null) {
      throw new IllegalArgumentException("User cannot be null!");
    }
    this.userId = profile.getId();
    this.firstName = profile.getFirstName();
    this.lastName = profile.getLastName();
    this.dateOfBirth = profile.getDateOfBirth();
    this.dateOfEntry = profile.getDateOfEntry();
    this.department = profile.getDepartment();
    this.position = profile.getPosition();
    this.team = profile.getTeam();
  }

  public Profile toEntity(User user) {
    Profile profile = new Profile();
    BeanUtils.copyProperties(this, profile);
    profile.setUser(user);
    return profile;
  }
}
