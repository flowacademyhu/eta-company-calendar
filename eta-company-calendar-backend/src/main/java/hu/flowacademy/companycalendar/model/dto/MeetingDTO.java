package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {

    private Long id;
    private String title;
    private String description;
    private Location location;
    private Recurring recurring;
    private LocalDateTime startingTime;
    private LocalDateTime finishTime;

    public void meetingDTOFromMeeting(Meeting meeting) {
        this.id = meeting.getId();
        this.title = meeting.getTitle();
        this.description = meeting.getDescription();
        this.location = meeting.getLocation();
        this.recurring = meeting.getRecurring();
        this.startingTime = meeting.getStartingTime();
        this.finishTime = meeting.getFinishTime();
    }
}
