package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.User;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingCreateDTO {

  private String title;
  private String description;
  private Location location;
  private String otherLocation;
  private Recurring recurring;
  private Long startingTime;
  private Long finishTime;
  private String createdBy;
  private List<String> requiredAttendants = new ArrayList<>();
  private List<String> optionalAttendants = new ArrayList<>();

  public Meeting toEntity(User createdBy, List<User> requiredAttendants,
      List<User> optionalAttendants) {
    Meeting meeting = new Meeting();
    BeanUtils.copyProperties(this, meeting);
    meeting.setCreatedBy(createdBy);
    meeting.setRequiredAttendants(requiredAttendants);
    meeting.setOptionalAttendants(optionalAttendants);
    return meeting;
  }
}
