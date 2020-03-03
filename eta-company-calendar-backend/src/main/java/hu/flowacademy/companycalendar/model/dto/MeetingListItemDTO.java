package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.EventType;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.RRule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingListItemDTO extends AbstractListItemDTO {
  private Long id;
  private String title;
  private Long startingTime;
  private Long finishTime;
  private EventType eventType = EventType.MEETING;
  private RRule rrule;

  public MeetingListItemDTO(Meeting meeting) {
    BeanUtils.copyProperties(meeting, this);
  }
}
