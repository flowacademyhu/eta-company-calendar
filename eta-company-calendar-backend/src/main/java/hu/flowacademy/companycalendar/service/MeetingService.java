package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Builder
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository; // TODO - UserService is not ready yet

    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Meeting findOne(Long id) {
        return meetingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }

    public Meeting create(MeetingDTO meetingDTO) {
        meetingDTO.setCreatedBy(userRepository.findById(id).get());
        meetingDTO.setCreatedAt(LocalDateTime.now());
        return meetingRepository.save(meetingDTO.toEntity());
    }

    public ResponseEntity updateMeeting(Long id, Meeting meetingDTO) {
        Meeting existingMeeting = findOne(meetingDTO.getId());
        existingMeeting.setTitle(meetingDTO.getTitle());
        existingMeeting.setDescription(meetingDTO.getDescription());
        existingMeeting.setLocation(meetingDTO.getLocation());
        existingMeeting.setRecurring(meetingDTO.getRecurring());
        existingMeeting.setStartingTime(meetingDTO.getStartingTime());
        existingMeeting.setFinishTime(meetingDTO.getFinishTime());
        existingMeeting.setUpdatedBy(userRepository.findById(id).get());
        existingMeeting.setUpdatedAt(LocalDateTime.now());
        existingMeeting.setRequiredAttendants(meetingDTO.getRequiredAttendants());
        existingMeeting.setOptionalAttendants(meetingDTO.getOptionalAttendants());
        meetingRepository.save(existingMeeting);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }
}
