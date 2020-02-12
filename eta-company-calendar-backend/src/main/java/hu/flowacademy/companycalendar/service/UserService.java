package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.UserRequestDTO;
import hu.flowacademy.companycalendar.model.dto.UserResponseDTO;
import hu.flowacademy.companycalendar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;


    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                             .stream()
                             .map(UserResponseDTO::new)
                             .collect(Collectors.toList());
    }

    public UserResponseDTO getUser(Long id) {
        return new UserResponseDTO(userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    public User createUser(UserRequestDTO userRequestDTO) {
        String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
        User user = new User();
        user.setPassword(psw);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        String psw = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(psw);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
