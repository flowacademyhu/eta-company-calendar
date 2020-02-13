package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.UserRequestDTO;
import hu.flowacademy.companycalendar.model.dto.UserResponseDTO;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;

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

  public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
    String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
    User user = new User();
    user.setPassword(psw);
    return new UserResponseDTO(userRepository.save(user));
  }

  public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    if (!BCrypt.checkpw(userRequestDTO.getPassword(), user.getPassword())) {
      String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
      user.setPassword(psw);
    }
    user.setEmail(userRequestDTO.getEmail());
    user.setRole(userRequestDTO.getRole());
    return new UserResponseDTO(userRepository.save(user));
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
