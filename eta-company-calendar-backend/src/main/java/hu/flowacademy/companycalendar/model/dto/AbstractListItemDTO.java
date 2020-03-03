package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.EventType;
import lombok.Data;

@Data
public abstract class AbstractListItemDTO {
  private Long id;
  private String title;
  private Long startingTime;
  private EventType eventType;
}
