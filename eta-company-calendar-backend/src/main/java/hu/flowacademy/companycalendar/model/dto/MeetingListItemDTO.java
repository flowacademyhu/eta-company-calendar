package hu.flowacademy.companycalendar.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingListItemDTO {
  private String title;
  private Long startingTime;
  private Long finishTime;

}
