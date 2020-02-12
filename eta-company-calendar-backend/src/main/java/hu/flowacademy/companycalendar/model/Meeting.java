package hu.flowacademy.companycalendar.model;

import hu.flowacademy.companycalendar.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(value = EnumType.STRING)
    private Location location;

    @Enumerated(value = EnumType.STRING)
    private Recurring recurring;

    private LocalDateTime startingTime;

    private LocalDateTime finishTime;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User updatedBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToMany
    private List<User> requiredAttendants;

    @ManyToMany
    private List<User> optionalAttendants;
}
