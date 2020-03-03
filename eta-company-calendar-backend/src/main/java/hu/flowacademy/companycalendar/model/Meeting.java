package hu.flowacademy.companycalendar.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Meeting {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private String description;

  @Enumerated(value = EnumType.STRING)
  private Location location;

  private String otherLocation;

  @Enumerated(value = EnumType.STRING)
  private Recurring recurring;

  @OneToOne(cascade = CascadeType.ALL)
  private RRule rrule;

  private Long startingTime;

  private Long finishTime;

  @ManyToOne
  private User createdBy;

  @ManyToOne
  private User updatedBy;

  private Long createdAt;

  private Long updatedAt;

  @ManyToMany
  private List<User> requiredAttendants;

  @ManyToMany
  private List<User> optionalAttendants;
}
