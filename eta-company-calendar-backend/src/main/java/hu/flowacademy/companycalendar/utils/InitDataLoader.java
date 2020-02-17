package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import hu.flowacademy.companycalendar.model.Roles;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        createUsers();
        createMeetings();
    }

    private void createUsers() {
        var admin = User.builder()
                .email("admin1@test.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Roles.ADMIN)
                .build();
        var user = User.builder()
                .email("user1@test.com")
                .password(passwordEncoder.encode("user123"))
                .role(Roles.USER)
                .build();
        userRepository.saveAll(List.of(admin, user));
    }

    private void createMeetings() {
        meetingRepository.save(Meeting.builder()
            .title("First_testMeeting")
            .description("TestDescription")
            .location(Location.MEETING_ROOM)
            .recurring(Recurring.DAILY)
            .startingTime(System.currentTimeMillis())
            .finishTime(System.currentTimeMillis() + 3600000)
            .createdAt(System.currentTimeMillis())
            .build());
        meetingRepository.save(Meeting.builder()
            .title("Second_testMeeting")
            .description("ValamiValamikor")
            .location(Location.MEETING_ROOM)
            .recurring(Recurring.DAILY)
            .startingTime(System.currentTimeMillis() + 3600000)
            .finishTime(System.currentTimeMillis() + 3600000 * 2)
            .createdAt(System.currentTimeMillis())
            .build());
    }
}
