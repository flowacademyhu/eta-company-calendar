package hu.flowacademy.companycalendar.model.dto;

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

}
