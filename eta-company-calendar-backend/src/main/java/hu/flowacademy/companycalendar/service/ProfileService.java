package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.User;
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

  public ProfileDTO updateProfile(Long id, ProfileDTO profileDTO) {
    Profile profile = profileDTO.toEntity(userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    if(profileDTO.getFirstName() != null){
    profile.setFirstName(profileDTO.getFirstName());}
    if(profileDTO.getLastName() != null){
      profile.setFirstName(profileDTO.getLastName());}
    if(profileDTO.getDepartment() != null){
      profile.setDepartment(profileDTO.getDepartment());}
    if(profileDTO.getPosition() != null){
      profile.setPosition(profileDTO.getPosition());}
    if(profileDTO.getDateOfBirth() != null){
      profile.setDateOfBirth(profileDTO.getDateOfBirth());}
    if(profileDTO.getDateOfEntry() != null){
      profile.setDateOfEntry(profileDTO.getDateOfEntry());}
    if(profileDTO.getTeam() != null){
      profile.setTeam(profileDTO.getTeam());}
    return new ProfileDTO(profileRepository.save(profile));
  }

  public void deleteProfile(Long id) {
    profileRepository.deleteById(id);
  }
}
