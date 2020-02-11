package hu.flowacademy.companycalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @NotNull
    private String title;

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private Location location;

    @Column
    private LocalDateTime startingTime;

    @Column
    private LocalDateTime endingTime;

    @Column
    @OneToOne
    private User createdBy;

    @Column
    @OneToMany
    private User updatedBy;

    @Column
    @OneToOne
    private User deletedBy;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Column
    @Enumerated(EnumType.STRING)
    private Recurring recurring;

    @Column
    @ManyToMany
    private List<User> requiredAttendants;

    @Column
    @ManyToMany
    private List<User> optionalAttendants;

}
