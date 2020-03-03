package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.RRule;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.ProfileRepository;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ReminderRepository reminderRepository;
    private final ProfileRepository profileRepository;

  @PostConstruct
  public void init() throws ParseException {
    createUsers();
    createMeetings();
    createReminder();
  }
    private void createUsers() {
        var testUsers = userRepository.saveAll(
            IntStream.range(0, 10).mapToObj( i -> User.builder()
                .email("user" + i + "@test.com")
                .name("user" + i)
                .password(passwordEncoder.encode("user123"))
                .role(i == 0 ? Roles.ADMIN : Roles.USER).build()).collect(Collectors.toList())
        );
        User calendarCsiha = User.builder()
            .email("calendarcsiha@gmail.com")
            .password("csiha")
            .name("Béla")
            .role(Roles.ADMIN)
            .build();
        userRepository.save(calendarCsiha);

        User csalaoh = User.builder()
            .email("csalaoh@gmail.com")
            .password("csala")
            .name("Sanyi")
            .role(Roles.ADMIN)
            .build();
        userRepository.save(csalaoh);

        testUsers.forEach(user -> {
            if (user.getId() == 2) {
                user.setRole(Roles.LEADER);
            } else {
                user.setLeader(testUsers.get(1));
            }
        });
        userRepository.saveAll(testUsers);
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
        var rrule = "DTSTART:20200201T010000Z\n"
            + "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,FR;UNTIL=20210131T000000Z";
        meetingRepository.save(Meeting.builder()
            .title("recurring meeting")
            .description("a meeting every Monday and Friday")
            .location(Location.MARKS_OFFICE)
            .createdAt(System.currentTimeMillis())
            .createdBy(testUsers.get(0))
            .requiredAttendants(List.of(testUsers.get(1)))
            .rrule(RRule.builder()
                .rrule(rrule)
                .dtstart(1580518800000L)
                .until(1612051200000L)
                .duration(7200000L).build())
            .build());
    }

    public void createReminder() throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        reminderRepository.save(Reminder.builder()
            .title("Fist testReminder")
            .description("Dont' forget!")
            .startingTime(formatter.parse("2020-02-12 10:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(1L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("second testReminder")
            .description("Bee happy!")
            .startingTime(System.currentTimeMillis())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("3nd testReminder")
            .description("Meeting always")
            .startingTime(formatter.parse("2020-01-12 12:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("4nd testReminder")
            .description("OMG")
            .startingTime(formatter.parse("2020-03-12 10:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
    }
}
