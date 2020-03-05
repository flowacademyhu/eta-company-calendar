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
      List<String> userNames = List.of("Csiha Admin", "Kószó Tamás", "Fábián Ferenc", "Csányi László",
          "Mező János", "Molnár Dóra", "Kocsis Tamás", "Szűcs Nóra", "Plesa Tamás", "Urbán József");
      List<String> userEmails = List.of("calendarcsiha@gmail.com", "ccalendar30@gmail.com",
          "teszt_e@yahoo.com", "laszlojunior40@gmail.com", "bmcalendar00@gmail.com",
          "molnaardora@gmail.com","csihakft1@gmail.com", "nori.szucs92@gmail.com",
          "sandornagyflow95@gmail.com", "jozsef.urbn.88@gmail.com");

        var testUsers = userRepository.saveAll(
            IntStream.range(0, 10).mapToObj( i -> User.builder()
                .email(userEmails.get(i))
                .name(userNames.get(i))
                .password(passwordEncoder.encode("user123"))
                .role(i == 0 ? Roles.ADMIN : Roles.USER).build()).collect(Collectors.toList())
        );

        testUsers.forEach(user -> {
            if (user.getId() == 2 || user.getId() == 3) {
                user.setRole(Roles.LEADER);
            } else if (user.getId() % 2 == 0){
                user.setLeader(testUsers.get(1));
            } else {
              user.setLeader(testUsers.get(2));
            }
            if(user.getRole() == Roles.ADMIN){
              user.setLeader(null);
            }
        });
        userRepository.saveAll(testUsers);
    }

    private void createMeetings() throws ParseException {
        var testUsers = userRepository.findAll();
      List<String> meetingTitles = List.of("Vezetői tájékoztató", "Új projekt előkészítése", "Calendar projekt bemutató",
          "Munkavédelmi előadás", "Tűzvédelmi tájékoztatás", "Céges születésnapi rendezvény előkészítése",
          "Félév értékelése", "Új munkatársak bemutatása", "Cég bemutatása partnernek", "Projektfejlesztés brainstorming");

      meetingRepository.saveAll(
            IntStream.range(0, 10).mapToObj(i -> Meeting.builder()
                .title(meetingTitles.get(i))
                .description("description of meeting: " + meetingTitles.get(i))
                .location(i % 2 == 0? Location.MEETING_ROOM : Location.MARKS_OFFICE)
                .startingTime(System.currentTimeMillis() + 86400000 * i)
                .finishTime(System.currentTimeMillis() + 86400000 * i + 3600000)
                .createdAt(System.currentTimeMillis())
                .createdBy(testUsers.get(i))
                .requiredAttendants(testUsers.subList(i + 1, 10))
                .optionalAttendants(List.of(testUsers.get(1)))
                .build()).collect(Collectors.toList())
        );
        var rrule = "DTSTART:20200101T010000Z\n"
            + "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO;UNTIL=20201231T000000Z";
      DateFormat formatter = new SimpleDateFormat("HH:mm");
        meetingRepository.save(Meeting.builder()
            .title("Weekly KickOff")
            .description("heti megbeszélés")
            .location(Location.MARKS_OFFICE)
            .createdAt(System.currentTimeMillis())
            .createdBy(testUsers.get(0))
            .requiredAttendants(testUsers)
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
            .title("Calendar Projekt Demo")
            .description("A Flow Academy ETA csapatának demója a Company Calendar-ról")
            .startingTime(formatter.parse("2020-03-06 17:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("Időpont egyeztetés")
            .description("Megbeszélni egy időpontot a Flow-val !")
            .startingTime(formatter.parse("2020-03-12 17:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("Statisztika")
            .description("A márciusi statisztika leadási határideje")
            .startingTime(formatter.parse("2020-03-24 12:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
        reminderRepository.save(Reminder.builder()
            .title("Eszközrendelés")
            .description("Eszközigények alapján a szükséges eszközök megrendelése")
            .startingTime(formatter.parse("2020-03-12 10:00").getTime())
            .createdAt(System.currentTimeMillis())
            .recurring(Recurring.DAILY)
            .createdBy(userRepository.getOne(2L))
            .build());
    }
}
