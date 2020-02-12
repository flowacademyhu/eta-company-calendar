package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Roles;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class UserRequestDTO {
    private String email;
    private String password;
    private Roles role;



}
