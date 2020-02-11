package hu.flowacademy.companycalendar.model;

import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Location location;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Recurring recurring;

    @Column
    private LocalDateTime startingTime;

    @Column
    private LocalDateTime finishTime;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User updatedBy;

    @ManyToOne
    private User deletedBy;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime deletedAt;

    @Column
    @ManyToMany
    private List<User> requiredAttendants;

    @Column
    @ManyToMany
    private List<User> optionalAttendants;

    public void meetingFromMeetingDTO(MeetingDTO meetingDTO) {
        this.id = meetingDTO.getId();
        this.title = meetingDTO.getTitle();
        this.description = meetingDTO.getDescription();
        this.startingTime = meetingDTO.getStartingTime();
        this.finishTime = meetingDTO.getFinishTime();
        this.recurring = meetingDTO.getRecurring();
    }

}
