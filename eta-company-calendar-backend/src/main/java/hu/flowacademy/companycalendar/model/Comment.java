package hu.flowacademy.companycalendar.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.flowacademy.companycalendar.model.dto.CommentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonIgnore
    private Meeting meeting;

}