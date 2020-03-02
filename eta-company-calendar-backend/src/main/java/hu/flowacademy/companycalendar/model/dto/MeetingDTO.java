package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {

  private Long id;
  private String title;
  private String description;
  private Location location;
  private String otherLocation;
  private Recurring recurring;
  private Long startingTime;
  private Long finishTime;
  private UserResponseDTO createdBy;
  private UserResponseDTO updatedBy;
  private Long createdAt;
  private Long updatedAt;
  private List<UserResponseDTO> requiredAttendants;
  private List<UserResponseDTO> optionalAttendants;

  public MeetingDTO(Meeting meeting) {
    this.id = meeting.getId();
    this.title = meeting.getTitle();
    this.description = meeting.getDescription();
    this.location = meeting.getLocation();
    this.otherLocation = meeting.getOtherLocation();
    this.recurring = meeting.getRecurring();
    this.startingTime = meeting.getStartingTime();
    this.finishTime = meeting.getFinishTime();
    this.createdBy = new UserResponseDTO(meeting.getCreatedBy());
    if (meeting.getUpdatedBy() != null) {
      this.updatedBy = new UserResponseDTO(meeting.getUpdatedBy());
    }
    this.createdAt = meeting.getCreatedAt();
    this.updatedAt = meeting.getUpdatedAt();
    this.requiredAttendants = meeting.getRequiredAttendants().stream().map(UserResponseDTO::new)
        .collect(
            Collectors.toList());
    this.optionalAttendants = meeting.getOptionalAttendants().stream().map(UserResponseDTO::new)
        .collect(
            Collectors.toList());
  }

  public Meeting toEntity() {
    Meeting meeting = new Meeting();
    BeanUtils.copyProperties(this, meeting);
    return meeting;
  }
}
