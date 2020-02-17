package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {

    private Long id;
    private String title;
    private String description;
    private Location location;
    private Recurring recurring;
    private Long startingTime;
    private Long finishTime;
    private User createdBy;
    private User updatedBy;
    private Long createdAt;
    private Long updatedAt;
    private List<User> requiredAttendants;
    private List<User> optionalAttendants;

    public MeetingDTO(Meeting meeting) {
        this.id = meeting.getId();
        this.title = meeting.getTitle();
        this.description = meeting.getDescription();
        this.location = meeting.getLocation();
        this.recurring = meeting.getRecurring();
        this.startingTime = meeting.getStartingTime();
        this.finishTime = meeting.getFinishTime();
        this.createdBy = meeting.getCreatedBy();
        this.updatedBy = meeting.getUpdatedBy();
        this.createdAt = meeting.getCreatedAt();
        this.updatedAt = meeting.getUpdatedAt();
        this.requiredAttendants = meeting.getRequiredAttendants();
        this.optionalAttendants = meeting.getOptionalAttendants();
    }

    public Meeting toEntity() {
        Meeting meeting = new Meeting();
        BeanUtils.copyProperties(this, meeting);
        return meeting;
    }
}
