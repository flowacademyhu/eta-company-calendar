package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.DTO.ProfileDTO;
import hu.flowacademy.companycalendar.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/profiles")
public class ProfileResource {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public List<ProfileDTO> getAllProfile(){
        return profileService.getAllProfile();
    }

    @GetMapping("/{id}")
    public ProfileDTO getProfile(@PathVariable Long id){
        return profileService.getProfile(id);
    }

    @PostMapping
    public ResponseEntity<ProfileDTO> createProfile(@RequestBody ProfileDTO profileDTO){
        return ResponseEntity.ok(profileService.createProfile(profileDTO));
    }

    @PutMapping
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO){
        return ResponseEntity.ok(profileService.updateProfile(profileDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id){
        profileService.deleteProfile(id);
        return ResponseEntity.ok().build();
    }
}
