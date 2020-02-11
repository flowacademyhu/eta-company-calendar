package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;


    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Meeting findOne(Long id) {
        return meetingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }

    public Meeting create(@NotNull MeetingDTO meetingDTO) {
        Meeting meeting = new Meeting();
        meeting.setTitle(meetingDTO.getTitle());
        meeting.setDescription(meetingDTO.getDescription());
        meeting.setLocation(meetingDTO.getLocation());
        meeting.setRecurring(meetingDTO.getRecurring());
        meeting.setStartingTime(meetingDTO.getStartingTime());
        meeting.setFinishTime(meetingDTO.getFinishTime());
        return meetingRepository.save(meeting);
    }

    public ResponseEntity<Void> updateMeeting(MeetingDTO meetingDTO) {
        Meeting existingMeeting = findOne(meetingDTO.getId());
        existingMeeting.setTitle(meetingDTO.getTitle());
        existingMeeting.setDescription(meetingDTO.getDescription());
        existingMeeting.setLocation(meetingDTO.getLocation());
        existingMeeting.setRecurring(meetingDTO.getRecurring());
        existingMeeting.setStartingTime(meetingDTO.getStartingTime());
        existingMeeting.setFinishTime(meetingDTO.getFinishTime());
        meetingRepository.save(existingMeeting);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }

}
