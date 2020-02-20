package hu.flowacademy.companycalendar.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingQueryDTO {
  private Long userId;
  private Long startingTimeFrom;
  private Long startingTimeTo;
}
