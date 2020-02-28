package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.config.mailing.MailingConfig;
import hu.flowacademy.companycalendar.constants.Constants;
import hu.flowacademy.companycalendar.email.GmailService;
import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.exception.MeetingNotFoundException;
import hu.flowacademy.companycalendar.exception.UserNotFoundException;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MeetingService {

    private static final DateFormat FORMATTER_TO_HOUR = new SimpleDateFormat("HH:mm");
    private static final DateFormat FORMATTER_TO_DATE = new SimpleDateFormat("yyyy-MM-dd");
    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository; // TODO - UserService is not ready yet
    private final GmailService emailService;
    private final MailingConfig mailingConfig;

    public List<MeetingDTO> findAll() {
       return meetingRepository
               .findAll()
               .stream()
               .map(MeetingDTO::new)
               .collect(Collectors.toList());
    }

    public MeetingDTO findOne(Long id) {
        return new MeetingDTO(meetingRepository.findById(id)
                .orElseThrow(() -> new MeetingNotFoundException(id)));
    }

    public List<MeetingListItemDTO> findByUserIdAndTimeRange(Long userId,
                                                             Long startingTimeFrom,
                                                             Long startingTimeTo) {
        return meetingRepository.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo)
            .stream().map(MeetingListItemDTO::new).collect(Collectors.toList());
    }

    public List<MeetingDTO> findByUserId(Long userId) {
        return meetingRepository.findByInvitedUserId(userId)
                .stream().map(MeetingDTO::new).collect(Collectors.toList());
    }

    public Meeting create(MeetingCreateDTO dto) {
        Meeting meeting = dto.toEntity();
        User createdBy = userRepository.findById(dto.getCreatedByUser()).orElseThrow();
        List<User> requiredUsers = userRepository.findAllById(dto.getRequiredAttendants());
        List<User> optionalUsers = userRepository.findAllById(dto.getOptionalAttendants());

        meeting.setCreatedBy(createdBy);
        meeting.setUpdatedBy(createdBy);
        meeting.setRequiredAttendants(requiredUsers);
        meeting.setOptionalAttendants(optionalUsers);
        meeting.setCreatedAt(System.currentTimeMillis());
        meeting.setUpdatedAt(meeting.getCreatedAt());

        return meetingRepository.save(meeting);
    }

    public Long createWithEmails(MeetingCreateDTO dto) {
        Meeting meeting = create(dto);
        Date startingDate = new Date(meeting.getStartingTime());
        String meetingDate = FORMATTER_TO_DATE.format(startingDate);
        String start = FORMATTER_TO_HOUR.format(startingDate);
        String finish = FORMATTER_TO_HOUR.format(meeting.getFinishTime());
        String location = Location.OTHER.equals(dto.getLocation()) ? dto.getOtherLocation() : dto.getLocation().toString();

        sendMeetingEmailForAttendants(meeting, meetingDate, start, finish, location, true);
        sendMeetingEmailForAttendants(meeting, meetingDate, start, finish, location, false);

        return meeting.getId();
    }

    private void sendMeetingEmailForAttendants(Meeting meeting, String meetingDate, String start, String finish, String location, boolean obligatory) {
        List<User> attendants = obligatory ? meeting.getRequiredAttendants() : meeting.getOptionalAttendants();
        for (User attendant : attendants) {
            String firstName = attendant.getProfile().getFirstName();
            String text = getMeetingText(firstName, meetingDate, start, finish, location, obligatory ? Constants.OBLIGATORY : Constants.NOT_OBLIGATORY);
            emailService.send(attendant.getEmail(), Constants.NEW_MEETING, text);
        }
    }

    private String getMeetingText(String firstName, String meetingDate, String start, String finish, String location, String obligatory) {
        return String.format(mailingConfig.getMessageTemplate(),
            firstName,
            meetingDate,
            start,
            finish,
            location,
            obligatory);
    }

    public MeetingDTO updateMeeting(Long userId, MeetingDTO meetingDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        Meeting meeting = meetingDTO.toEntity();
        meeting.setUpdatedBy(user);
        meeting.setUpdatedAt(System.currentTimeMillis());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }

    private String createMeetingEmailText(String... parameters) {
        return String.format(mailingConfig.getMessageTemplate(), parameters);
    }
}
