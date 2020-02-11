package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.Recurring;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
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

    @PostConstruct
    public void init() {
        
        meetingRepository.save(Meeting.builder().title("Első_testMeeting").description("TestDescription").location(Location.TARGYALO).recurring(Recurring.DAILY).startingTime(LocalDateTime.now()).finishTime(LocalDateTime.of(2020,3,14,14,23)).build());
        meetingRepository.save(Meeting.builder().title("Második_testMeeting").description("ValamiValamikor").location(Location.TARGYALO).recurring(Recurring.DAILY).startingTime(LocalDateTime.of(2020, 2,8,12,20)).finishTime(LocalDateTime.of(2020,3,14,14,23)).build());
    }
}
