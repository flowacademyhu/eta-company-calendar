package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.DTO.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
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

    public List<Profile> getAllProfile() {
        return profileRepository.findAll();
    }

    public Profile getProfile(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void createProfile(Profile profile) {
        profileRepository.save(profile);
    }

    public void updateProfile(Profile profile) {
        profileRepository.save(profile);
    }

    public void deleteProfile(Long id) { profileRepository.deleteById(id);}

    public Profile profileDTOtoEntity(ProfileDTO profileDTO){
        Profile profile = new Profile();
        // profile.setUser(userRepository.getUser(profileDTO.getUserId()).get());
        profile.setFirstName(profileDTO.getFirstName());
        profile.setLastName(profileDTO.getLastName());
        profile.setDateOfBirth(profileDTO.getDateOfBirth());
        profile.setDateOfEntry(profileDTO.getDateOfEntry());
        profile.setDepartment(profileDTO.getDepartment());
        profile.setPosition(profileDTO.getPosition());
        profile.setTeam(profileDTO.getTeam());
        return profile;
    }

}
