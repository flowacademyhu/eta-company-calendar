package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.server.ResponseStatusException;

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
                .orElseThrow(() -> new RuntimeException("Meeting not found in DB")));
    }

    public MeetingDTO create(Long userId, MeetingDTO meetingDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found in DB"));
        Meeting meeting = meetingDTO.toEntity();
        meeting.setCreatedBy(user);
        meeting.setCreatedAt(System.currentTimeMillis());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public Long createWithEmails(MeetingCreateDTO dto) {
        User createdBy = userRepository.findFirstByEmail(dto.getCreatedBy())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));
        List<User> requiredAttendants = userRepository.findByEmailIn(dto.getRequiredAttendants());
        List<User> optionalAttendants = userRepository.findByEmailIn(dto.getOptionalAttendants());
        Meeting meeting = dto.toEntity(createdBy, requiredAttendants, optionalAttendants);
        meeting.setCreatedAt(System.currentTimeMillis());
        return meetingRepository.save(meeting).getId();
    }

    public MeetingDTO updateMeeting(Long userId, MeetingDTO meetingDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found in DB"));
        Meeting meeting = meetingDTO.toEntity();
        meeting.setUpdatedBy(user);
        meeting.setUpdatedAt(System.currentTimeMillis());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }
}
