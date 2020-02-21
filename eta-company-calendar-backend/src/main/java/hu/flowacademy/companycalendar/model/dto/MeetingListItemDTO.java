package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Meeting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingListItemDTO {
  private Long id;
  private String title;
  private Long startingTime;
  private Long finishTime;

  public MeetingListItemDTO(Meeting meeting) {
    BeanUtils.copyProperties(meeting, this);
  }
}
