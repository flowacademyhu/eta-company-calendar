package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.DTO.ProfileDTO;
import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profiles")
public class ProfileResource {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public List<ProfileDTO> getAllProfile(){
        return profileService.getAllProfile()
                             .stream()
                             .map(ProfileDTO::new)
                             .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProfileDTO getProfile(@PathVariable Long id){
        return new ProfileDTO(profileService.getProfile(id));
    }

    @PostMapping
    public ResponseEntity<Void> createProfile(@RequestBody ProfileDTO profileDTO){
        profileService.createProfile(profileService.profileDTOtoEntity(profileDTO));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateProfile(@RequestBody ProfileDTO profileDTO){
        profileService.updateProfile(profileService.profileDTOtoEntity(profileDTO));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id){
        profileService.deleteProfile(id);
        return ResponseEntity.ok().build();
    }
}
