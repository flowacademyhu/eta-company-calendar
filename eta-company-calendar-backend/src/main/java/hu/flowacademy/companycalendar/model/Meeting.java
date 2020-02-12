package hu.flowacademy.companycalendar.model;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Meeting {
    @Id
    private Long id;
}
