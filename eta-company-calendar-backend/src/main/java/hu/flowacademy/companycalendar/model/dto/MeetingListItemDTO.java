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
  private String title;
  private Long startingTime;
  private Long finishTime;

  public static MeetingListItemDTO FromEntity(Meeting meeting) {
    var dto = new MeetingListItemDTO();
    BeanUtils.copyProperties(meeting, dto);
    return dto;
  }

}
