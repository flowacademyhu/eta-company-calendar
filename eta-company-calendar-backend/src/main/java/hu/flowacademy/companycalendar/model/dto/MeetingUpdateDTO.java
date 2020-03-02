package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.User;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingUpdateDTO {

  private Long id;
  private Long createdByUser;
  private String title;
  private String description;
  private Location location;
  private String otherLocation;
  private Recurring recurring;
  private Long startingTime;
  private Long finishTime;
  private Long updatedAt;
  private String updatedBy;
  private Set<Long> requiredAttendants = new HashSet<>();
  private Set<Long> optionalAttendants = new HashSet<>();
 // private List<String> requiredAttendants = new ArrayList<>();
 // private List<String> optionalAttendants = new ArrayList<>();

  public MeetingUpdateDTO(Meeting meeting) {
    this.id = meeting.getId();
    this.createdByUser = meeting.getUpdatedBy().getId();
    this.title = meeting.getTitle();
    this.description = meeting.getDescription();
    this.location = meeting.getLocation();
    this.otherLocation = meeting.getOtherLocation();
    this.recurring = meeting.getRecurring();
    this.startingTime = meeting.getStartingTime();
    this.finishTime = meeting.getFinishTime();
    this.updatedAt = meeting.getUpdatedAt();
    this.updatedBy = meeting.getUpdatedBy().getEmail();
  }

  public Meeting toEntity(User updatedBy,
                          List<User> requiredAttendants,
                          List<User> optionalAttendants) {
    Meeting meeting = new Meeting();
    BeanUtils.copyProperties(this, meeting);
    meeting.setUpdatedBy(updatedBy);
    meeting.setRequiredAttendants(requiredAttendants);
    meeting.setOptionalAttendants(optionalAttendants);
    return meeting;
  }
}
