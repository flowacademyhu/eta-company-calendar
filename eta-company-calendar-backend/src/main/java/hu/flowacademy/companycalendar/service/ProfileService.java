package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.DTO.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    private UserRepository userRepository;

    public List<Profile> getAllProfile() {
        return profileRepository.findAll();
    }

    public Profile getProfile(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void createProfile(ProfileDTO profileDTO) {
        Profile profile = profileDTO.toEntity(userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        profileRepository.save(profile);
    }

    public void updateProfile(ProfileDTO profileDTO) {
        Profile profile = profileDTO.toEntity();
        profile.setUser(userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        profileRepository.save(profile);
    }

    public void deleteProfile(Long id) { profileRepository.deleteById(id);}
    
}
