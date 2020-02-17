package hu.flowacademy.companycalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Long startingTime;

    @Column
    private Long endingTime;

    @Enumerated(value = EnumType.STRING)
    private Recurring recurring;

    @ManyToOne
    @JoinColumn
    private User user;
}
