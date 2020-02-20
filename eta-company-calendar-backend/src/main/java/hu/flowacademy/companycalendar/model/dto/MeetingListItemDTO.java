package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Meeting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingListItemDTO {
  private String title;
  private Long startingTime;
  private Long finishTime;

  public static MeetingListItemDTO FromEntity(Meeting meeting) {
    return MeetingListItemDTO.builder()
        .title(meeting.getTitle())
        .startingTime(meeting.getStartingTime())
        .finishTime(meeting.getFinishTime())
        .build();
  }

}
