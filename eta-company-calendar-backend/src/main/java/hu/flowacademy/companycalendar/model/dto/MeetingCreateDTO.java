package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.RRule;
import hu.flowacademy.companycalendar.model.Recurring;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingCreateDTO {

  private Long id;
  private Long createdByUser;
  private Set<Long> requiredAttendants;
  private Set<Long> optionalAttendants;
  private String title;
  private String description;
  private Location location; // TODO: validate
  private RRule rrule;
  private String otherLocation;
  private Recurring recurring;
  private Long startingTime;
  private Long finishTime;

  public Meeting toEntity() {
    Meeting m = new Meeting();
    BeanUtils.copyProperties(this, m);
    return m;
  }
}
