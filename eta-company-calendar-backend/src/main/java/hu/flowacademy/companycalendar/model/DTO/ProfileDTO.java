package hu.flowacademy.companycalendar.model.DTO;

import hu.flowacademy.companycalendar.model.Profile;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Data
@NoArgsConstructor
public class ProfileDTO {

    private long userId;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private LocalDate dateOfEntry;
    private String department;
    private String position;
    private String team;


    public ProfileDTO(Profile profile){
        if(profile.getUser() != null){
        this.userId = profile.getUser().getId();
        } else { throw new IllegalArgumentException("User cannot be null!");}
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.dateOfBirth = profile.getDateOfBirth();
        this.dateOfEntry = profile.getDateOfEntry();
        this.department = profile.getDepartment();
        this.position = profile.getPosition();
        this.team = profile.getTeam();
    }

    public Profile toEntity(){
        Profile profile = new Profile();
        // profile.setUser(userRepository.getUser(profileDTO.getUserId()).get());
        profile.setFirstName(this.firstName);
        profile.setLastName(this.lastName);
        profile.setDateOfBirth(this.dateOfBirth);
        profile.setDateOfEntry(this.dateOfEntry);
        profile.setDepartment(this.department);
        profile.setPosition(this.position);
        profile.setTeam(this.team);
        return profile;
    }


}
