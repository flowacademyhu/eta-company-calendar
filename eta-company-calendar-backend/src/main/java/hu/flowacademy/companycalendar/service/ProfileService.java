package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.ProfileNotFoundException;
import hu.flowacademy.companycalendar.model.dto.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProfileService {

  private final ProfileRepository profileRepository;

  public List<ProfileDTO> getAllProfile() {
    return profileRepository.findAll()
        .stream()
        .map(ProfileDTO::new)
        .collect(Collectors.toList());
  }

  public ProfileDTO getProfile(Long id) {
    return new ProfileDTO(profileRepository.findById(id)
        .orElseThrow(() -> new ProfileNotFoundException(id)));
  }

  public ProfileDTO updateProfile(Long id, ProfileDTO profileDTO) {
    Profile profile = profileRepository.findByUserId(id)
        .orElseThrow(() -> new ProfileNotFoundException(id));
    BeanUtils.copyProperties(profileDTO, profile);
    return new ProfileDTO(profileRepository.save(profile));
  }

  public void deleteProfile(Long id) {
    profileRepository.deleteById(id);
  }
}
