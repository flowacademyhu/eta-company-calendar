package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.dto.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
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

  private final ProfileRepository profileRepository;

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

  public ProfileDTO updateProfile(Long id, ProfileDTO profileDTO) {
    Profile profile = profileRepository.findByUserId(id).orElseThrow();
    BeanUtils.copyProperties(profileDTO, profile);
    return new ProfileDTO(profileRepository.save(profile));
  }

  public void deleteProfile(Long id) {
    profileRepository.deleteById(id);
  }
}
