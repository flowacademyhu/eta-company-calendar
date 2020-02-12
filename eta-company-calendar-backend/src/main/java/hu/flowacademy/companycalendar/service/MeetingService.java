package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Builder
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository; // TODO - UserService is not ready yet

    public List<MeetingDTO> findAll() {
       return meetingRepository
               .findAll()
               .stream()
               .map(MeetingDTO::new)
               .collect(Collectors.toList());
    }

    public MeetingDTO findOne(Long id) {
        return new MeetingDTO(meetingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found")));
    }

    public MeetingDTO create(Long id, MeetingDTO meetingDTO) {
        Meeting meeting = meetingDTO.toEntity();
        meeting.setCreatedBy(userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
        meeting.setCreatedAt(LocalDateTime.now());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public MeetingDTO updateMeeting(Long id, MeetingDTO meetingDTO) {
        Meeting existingMeeting = meetingRepository.findById(meetingDTO.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
        existingMeeting.setTitle(meetingDTO.getTitle());
        existingMeeting.setDescription(meetingDTO.getDescription());
        existingMeeting.setLocation(meetingDTO.getLocation());
        existingMeeting.setRecurring(meetingDTO.getRecurring());
        existingMeeting.setStartingTime(meetingDTO.getStartingTime());
        existingMeeting.setFinishTime(meetingDTO.getFinishTime());
        existingMeeting.setUpdatedBy(userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
        existingMeeting.setUpdatedAt(LocalDateTime.now());
        existingMeeting.setRequiredAttendants(meetingDTO.getRequiredAttendants());
        existingMeeting.setOptionalAttendants(meetingDTO.getOptionalAttendants());
        return new MeetingDTO(meetingRepository.save(existingMeeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }
}
