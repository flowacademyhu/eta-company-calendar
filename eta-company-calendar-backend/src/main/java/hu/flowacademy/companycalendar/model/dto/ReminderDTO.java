package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ReminderDTO {

    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Long startingTime;
    private Recurring recurring;

    public ReminderDTO(Reminder reminder) {
        this.id = reminder.getId();
        this.title = reminder.getTitle();
        this.description = reminder.getDescription();
        this.startingTime = reminder.getStartingTime();
        this.recurring = reminder.getRecurring();
        if (reminder.getUser() != null) {
            this.userId = reminder.getUser().getId();
        } else this.userId = null;
    }

    public Reminder toEntity() {
        Reminder reminder = new Reminder();
        reminder.setTitle(getTitle());
        reminder.setDescription(getDescription());
        reminder.setStartingTime(getStartingTime());
        reminder.setRecurring(getRecurring());
        return reminder;
    }
}
