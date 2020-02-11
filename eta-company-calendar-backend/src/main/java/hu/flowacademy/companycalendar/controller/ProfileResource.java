package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Profile;
import hu.flowacademy.companycalendar.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileResource {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public List<Profile> getAllProfile(){
        return profileService.getAllProfile();
    }

    @GetMapping("/{id}")
    public Profile getProfile(@PathVariable Long id){
        return profileService.getProfile(id);
    }

    @PostMapping
    public void createProfile(@RequestBody Profile profile){
        profileService.createProfile(profile);
    }

    @PutMapping
    public void updateProfile(@RequestBody Profile profile){
        profileService.updateProfile(profile);
    }

    @DeleteMapping("/{id}")
    public void deleteProfile(@PathVariable Long id){profileService.deleteProfile(id);}
}
