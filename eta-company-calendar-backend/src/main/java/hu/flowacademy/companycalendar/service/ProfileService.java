package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.ProfileNotFoundException;
import hu.flowacademy.companycalendar.model.dto.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProfileService {

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
        .orElseThrow(ProfileNotFoundException::new));
  }

  public ProfileDTO createProfile(ProfileDTO profileDTO) {
    Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
        .orElseThrow(ProfileNotFoundException::new));
    return new ProfileDTO(profileRepository.save(profile));
  }

  public ProfileDTO updateProfile(ProfileDTO profileDTO) {
    Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
        .orElseThrow(ProfileNotFoundException::new));
    return new ProfileDTO(profileRepository.save(profile));
  }

  public void deleteProfile(Long id) {
    profileRepository.deleteById(id);
  }
}
