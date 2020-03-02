package hu.flowacademy.companycalendar.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class Profile {

  @Id
  private Long id;

  @OneToOne
  @JoinColumn
  @MapsId
  @JsonBackReference
  private User user;

  private String firstName;
  private String lastName;
  private LocalDate dateOfBirth;
  private LocalDate dateOfEntry;
  private String leader;
  private String department;
  private String position;
  private String team;

  public Profile(Object o, User calendarCsiha, String csiha, String calendar, LocalDate now, LocalDate now1, String mydepartment, String intern, String building) {
  }
}
