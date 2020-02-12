package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;

public class UserResponseDTO {

    private Long id;
    private String email;
    private Roles role;

    public UserResponseDTO(User user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
