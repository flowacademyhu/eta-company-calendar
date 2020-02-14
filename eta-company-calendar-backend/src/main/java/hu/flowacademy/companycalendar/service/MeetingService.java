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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found in DB")));
    }

    public MeetingDTO create(Long userId, MeetingDTO meetingDTO) {
        Meeting meeting = meetingDTO.toEntity();
        meeting.setCreatedBy(userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found in DB")));
        meeting.setCreatedAt(LocalDateTime.now());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public MeetingDTO updateMeeting(Long userId, MeetingDTO meetingDTO) {
        Meeting meeting = meetingDTO.toEntity();
        meeting.setUpdatedBy(userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found in DB")));
        meeting.setUpdatedAt(LocalDateTime.now());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }
}
