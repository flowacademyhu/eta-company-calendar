package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.dto.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProfileService {

<<<<<<< HEAD
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public List<ProfileDTO> getAllProfile() {
        return profileRepository.findAll()
                                .stream()
                                .map(ProfileDTO::new)
                                .collect(Collectors.toList());
    }

    public ProfileDTO getProfile(Long id) {
        return new ProfileDTO(profileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    public ProfileDTO createProfile(ProfileDTO profileDTO) {
        Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        return new ProfileDTO(profileRepository.save(profile));
    }

    public ProfileDTO updateProfile(ProfileDTO profileDTO) {
        Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        return new ProfileDTO(profileRepository.save(profile));
    }

    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
    
=======
  private final ProfileRepository profileRepository;
  private final UserRepository userRepository;

  public List<ProfileDTO> getAllProfile() {
    return profileRepository.findAll()
        .stream()
        .map(ProfileDTO::new)
        .collect(Collectors.toList());
  }

  public ProfileDTO getProfile(Long id) {
    return new ProfileDTO(profileRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
  }

  public ProfileDTO createProfile(ProfileDTO profileDTO) {
    Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    return new ProfileDTO(profileRepository.save(profile));
  }

  public ProfileDTO updateProfile(ProfileDTO profileDTO) {
    Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    return new ProfileDTO(profileRepository.save(profile));
  }

  public void deleteProfile(Long id) {
    profileRepository.deleteById(id);
  }

>>>>>>> 18352f10d9c57d0f864cfc977c8b07581fc98b10
}
