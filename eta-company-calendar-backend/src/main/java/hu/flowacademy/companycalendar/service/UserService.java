package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.email.EmailService;
import hu.flowacademy.companycalendar.email.EmailType;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.UserRequestDTO;
import hu.flowacademy.companycalendar.model.dto.UserResponseDTO;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
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
    if (userRepository.findFirstByEmail(userRequestDTO.getEmail()).isPresent()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
    String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
    User user = userRequestDTO.toEntity();
    user.setPassword(psw);
    return new UserResponseDTO(userRepository.save(user));
  }

  public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    if (!(("").equals(userRequestDTO.getPassword()))
        && !BCrypt.checkpw(userRequestDTO.getPassword(), user.getPassword())) {
      String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
      user.setPassword(psw);
    }
    if (userRequestDTO.getEmail() != null) {
      user.setEmail(userRequestDTO.getEmail());
    }
    if (userRequestDTO.getRole() != null) {
      user.setRole(userRequestDTO.getRole());
    }
    return new UserResponseDTO(userRepository.save(user));
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public List<UserResponseDTO> getEmployees(Long id) {
    return userRepository.findById(id).orElseThrow()
        .getEmployees()
        .stream()
        .map(UserResponseDTO::new)
        .collect(Collectors.toList());
  }
}
