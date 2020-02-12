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

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {

        userRepository.save(User.builder().build());
        userRepository.save(User.builder().build());

        meetingRepository.save(Meeting.builder().title("First_testMeeting").description("TestDescription").location(Location.MEETINGROOM).recurring(Recurring.DAILY).startingTime(LocalDateTime.now()).finishTime(LocalDateTime.of(2020,3,14,14,23)).createdAt(LocalDateTime.now()).build());
        meetingRepository.save(Meeting.builder().title("Second_testMeeting").description("ValamiValamikor").location(Location.MEETINGROOM).recurring(Recurring.WEEKLY).startingTime(LocalDateTime.of(2020, 2,8,12,20)).finishTime(LocalDateTime.of(2020,3,14,14,23)).createdAt(LocalDateTime.of(2019,12,10,9,32)).build());
    }
}
