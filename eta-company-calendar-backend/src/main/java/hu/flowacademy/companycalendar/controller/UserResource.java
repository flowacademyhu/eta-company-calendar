package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.UserRequestDTO;
import hu.flowacademy.companycalendar.model.dto.UserResponseDTO;
import hu.flowacademy.companycalendar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserResponseDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequestDTO userRequestDTO){
        return ResponseEntity.ok(userService.createUser(userRequestDTO));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user){
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

}
