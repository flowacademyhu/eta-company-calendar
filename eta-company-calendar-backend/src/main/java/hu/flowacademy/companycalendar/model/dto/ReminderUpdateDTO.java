package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReminderUpdateDTO {

  private Long id;
  private String title;
  private String description;
  private Recurring recurring;
  private Long startingTime;
  private Long userId;
  private Long updatedAt;

  public ReminderUpdateDTO(Reminder reminder) {
    this.id = reminder.getId();
    this.title = reminder.getTitle();
    this.description = reminder.getDescription();
    this.recurring = reminder.getRecurring();
    this.startingTime = reminder.getStartingTime();
    this.userId = reminder.getCreatedBy().getId();
    this.updatedAt = reminder.getUpdatedAt();
  }

  public Reminder toEntity(User userId) {
    Reminder reminder = new Reminder();
    BeanUtils.copyProperties(this, reminder);
    reminder.setCreatedBy(userId);
    reminder.setCreatedAt(System.currentTimeMillis());
    return reminder;
  }
}
