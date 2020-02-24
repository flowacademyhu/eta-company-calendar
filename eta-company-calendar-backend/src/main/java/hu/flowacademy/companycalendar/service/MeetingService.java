package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.email.EmailService;
import hu.flowacademy.companycalendar.email.EmailType;
import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository; // TODO - UserService is not ready yet
    private final EmailService emailService;

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

    public List<MeetingListItemDTO> findByUserIdAndTimeRange(Long userId,
                                                             Long startingTimeFrom,
                                                             Long startingTimeTo) {
        return meetingRepository.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo)
            .stream().map(MeetingListItemDTO::new).collect(Collectors.toList());
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
        DateFormat formatterToHour = new SimpleDateFormat("HH:mm");
        DateFormat formatterToDate = new SimpleDateFormat("yyyy-MM-dd");
        Meeting meeting = dto.toEntity(
            userRepository.findFirstByEmail(dto.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found in DB")),
            userRepository.findByEmailIn(dto.getRequiredAttendants()),
            userRepository.findByEmailIn(dto.getOptionalAttendants()));
        meeting.setCreatedAt(System.currentTimeMillis());
        List<User> emailList = meeting.getRequiredAttendants();
        for (User user : emailList) {
            Location location =  dto.getLocation();
            String username = user.getUsername();
            String startTime = formatterToHour.format(new Date(dto.getStartingTime()));
            String endTime = formatterToHour.format(new Date(dto.getFinishTime()));
            emailService.send(user.getEmail(),
                "Új értekezlet",
                EmailType.HTML,
                username,
                startTime,
                endTime,
                location);
        }


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
