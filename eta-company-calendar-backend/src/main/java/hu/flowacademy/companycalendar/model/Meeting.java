package hu.flowacademy.companycalendar.model;

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
    private Location location;

    @Column
    private LocalDateTime startingTime;

    @Column
    private LocalDateTime endingTime;

    @Column
    @OneToOne
    private User createdBy;

    @Column
    private Recurring recurring;

    @Column
    @ManyToMany
    private List<User> requiredAttendants;

    @Column
    private List<User> optionalAttendants;

}
