package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.email.EmailService;
import hu.flowacademy.companycalendar.email.EmailType;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.exception.UserAlreadyExistException;
import hu.flowacademy.companycalendar.exception.UserNotFoundException;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.UserRequestDTO;
import hu.flowacademy.companycalendar.model.dto.UserResponseDTO;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  @Qualifier("mailGunEmailService") private final EmailService emailService;

  public List<UserResponseDTO> getAllUsers() {
    return userRepository.findAll()
        .stream()
        .map(UserResponseDTO::new)
        .collect(Collectors.toList());
  }

  public UserResponseDTO getUser(Long id) {
    return new UserResponseDTO(userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id)));
  }

  public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
    if (userRepository.findFirstByEmail(userRequestDTO.getEmail()).isPresent()) {
      throw new UserAlreadyExistException(userRequestDTO.getEmail());
    }
    String psw = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
    User user = userRequestDTO.toEntity();
    user.setPassword(psw);
    user.setProfile(Profile.builder().user(user).build());
    if(userRequestDTO.getLeaderId() != null){
      user.setLeader(userRepository.findById(userRequestDTO.getLeaderId()).orElseThrow());}
    emailService.send(userRequestDTO.getEmail(), "registration", EmailType.HTML);
    return new UserResponseDTO(userRepository.save(user));
  }

  public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
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
    if(userRequestDTO.getLeaderId() != null){
      user.setLeader(userRepository.findById(userRequestDTO.getLeaderId()).orElseThrow());}
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
