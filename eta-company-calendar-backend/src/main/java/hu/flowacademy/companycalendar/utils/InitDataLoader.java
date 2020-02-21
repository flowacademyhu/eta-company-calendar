package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    private final ReminderRepository reminderRepository;

    @PostConstruct
    public void init() throws ParseException {
        createUsers();
        createMeetings();
        createReminder();
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
    public void createReminder() throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        reminderRepository.save(Reminder.builder()
            .title("Fist testReminder")
            .description("Dont' forget!")
            .startingTime(formatter.parse("2020-02-12 10:00").getTime())
            .endingTime(formatter.parse("2020-02-22 12:00").getTime())
            .recurring(Recurring.DAILY)
            .user(userRepository.getOne(1L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("second testReminder")
            .description("Bee happy!")
            .startingTime(System.currentTimeMillis())
            .endingTime(formatter.parse("2020-02-12 12:00").getTime())
            .recurring(Recurring.DAILY)
            .user(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("3nd testReminder")
            .description("Meeting always")
            .startingTime(formatter.parse("2020-01-12 12:00").getTime())
            .endingTime(formatter.parse("2020-01-12 03:00").getTime())
            .recurring(Recurring.DAILY)
            .user(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("4nd testReminder")
            .description("OMG")
            .startingTime(formatter.parse("2020-03-12 10:00").getTime())
            .endingTime(formatter.parse("2020-03-12 11:00").getTime())
            .recurring(Recurring.DAILY)
            .user(userRepository.getOne(2L))
            .build());
    }
}
