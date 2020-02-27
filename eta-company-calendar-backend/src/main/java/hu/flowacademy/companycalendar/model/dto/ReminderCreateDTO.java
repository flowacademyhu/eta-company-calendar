package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReminderCreateDTO {

  private String title;
  private String description;
  private Recurring recurring;
  private Long startingTime;
  private String createdBy;

  public Reminder toEntity(User createdBy) {
    Reminder reminder = new Reminder();
    BeanUtils.copyProperties(this, reminder);
    reminder.setUser(createdBy);
    return reminder;
  }
}
