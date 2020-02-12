package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class UserRequestDTO {

    private String email;
    private String password;
    private Roles role;

    public User toEntity(){
        User user = new User();
        BeanUtils.copyProperties(this, user);
        return user;
    }
}
