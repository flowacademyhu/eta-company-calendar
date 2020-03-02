package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Builder
public class ReminderDTO {

    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Long startingTime;
    private Long createdAt;
    private Long updatedAt;
    private Recurring recurring;

    public ReminderDTO(Reminder reminder) {
        this.id = reminder.getId();
        this.title = reminder.getTitle();
        this.description = reminder.getDescription();
        this.startingTime = reminder.getStartingTime();
        this.createdAt = reminder.getCreatedAt();
        this.updatedAt = reminder.getUpdatedAt();
        this.recurring = reminder.getRecurring();
        if (reminder.getCreatedBy() != null) {
            this.userId = reminder.getCreatedBy().getId();
        } else this.userId = null;
    }

    public Reminder toEntity() {
        Reminder reminder = new Reminder();
        BeanUtils.copyProperties(this, reminder);
        return reminder;
    }
}
