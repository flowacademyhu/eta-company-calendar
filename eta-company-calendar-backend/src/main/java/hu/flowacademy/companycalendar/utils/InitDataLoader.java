package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.ArrayList;
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
        List<User> testUsers = new ArrayList<>();
        var admin = User.builder()
                .email("admin1@test.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Roles.ADMIN)
                .build();
        testUsers.add(admin);
        for(int i = 0; i < 10; i++) {
            var user = User.builder()
                .email("user" + i + "@test.com")
                .password(passwordEncoder.encode("user123"))
                .role(Roles.USER)
                .build();
            testUsers.add(user);
        }
        userRepository.saveAll(testUsers);
    }

    private void createMeetings() {
        var testUsers = userRepository.findAll();
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
        List<Meeting> testMeetings = new ArrayList<>();
        for(int i = 0; i < 10; i++) {
            var meeting = Meeting.builder()
                .title("test meeting " + i)
                .description("description of test meeting " + i)
                .location(Location.MEETING_ROOM)
                .startingTime(System.currentTimeMillis() + 3600000)
                .finishTime(System.currentTimeMillis() + 3600000 * 2)
                .createdAt(System.currentTimeMillis())
                .createdBy(testUsers.get(i))
                .requiredAttendants(testUsers.subList(i + 1, 10))
                .optionalAttendants(List.of(testUsers.get(0)))
                .build();
            testMeetings.add(meeting);
        }
        meetingRepository.saveAll(testMeetings);
    }
}
