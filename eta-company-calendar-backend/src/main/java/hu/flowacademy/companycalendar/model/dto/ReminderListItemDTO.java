package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.EventType;
import hu.flowacademy.companycalendar.model.Reminder;
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
public class ReminderListItemDTO extends AbstractListItemDTO {

  private Long id;
  private String title;
  private Long startingTime;
  private String description;
  private EventType eventType = EventType.REMINDER;

  public ReminderListItemDTO(Reminder reminder) { BeanUtils.copyProperties(reminder, this); }
}
