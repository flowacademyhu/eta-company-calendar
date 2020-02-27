package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Reminder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReminderListItemDTO {

  private Long id;
  private String title;
  private Long startingTime;

  public ReminderListItemDTO(Reminder reminder) { BeanUtils.copyProperties(reminder, this); }
}
