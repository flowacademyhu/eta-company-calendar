package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
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
        userRepository.saveAll(
            IntStream.range(0, 10).mapToObj( i -> User.builder()
                .email("user" + i + "@test.com")
                .password(passwordEncoder.encode("user123"))
                .role(i == 0 ? Roles.ADMIN : Roles.USER).build()).collect(Collectors.toList())
        );
    }

    private void createMeetings() {
        var testUsers = userRepository.findAll();
        meetingRepository.saveAll(
            IntStream.range(0, 10).mapToObj(i -> Meeting.builder()
                .title("test meeting " + i)
                .description("description of test meeting " + i)
                .location(Location.MEETING_ROOM)
                .startingTime(System.currentTimeMillis() + 86400000 * i)
                .finishTime(System.currentTimeMillis() + 86400000 * i + 3600000)
                .createdAt(System.currentTimeMillis())
                .createdBy(testUsers.get(i))
                .requiredAttendants(testUsers.subList(i + 1, 10))
                .optionalAttendants(List.of(testUsers.get(0)))
                .build()).collect(Collectors.toList())
        );
    }
}
