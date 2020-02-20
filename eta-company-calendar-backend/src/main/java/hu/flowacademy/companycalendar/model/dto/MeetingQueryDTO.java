package hu.flowacademy.companycalendar.model.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingQueryDTO {
  @NotNull
  private Long userId;
  @NotNull
  private Long startingTimeFrom;
  @NotNull
  private Long startingTimeTo;
}
