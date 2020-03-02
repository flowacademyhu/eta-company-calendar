package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.config.mailing.MailingConfig;
import hu.flowacademy.companycalendar.constants.Constants;
import hu.flowacademy.companycalendar.email.EmailType;
import hu.flowacademy.companycalendar.email.GmailService;
import hu.flowacademy.companycalendar.exception.MeetingNotFoundException;
import hu.flowacademy.companycalendar.model.Location;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingUpdateDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Meeting findOne(Long id) {
        return meetingRepository.findById(id)
            .orElseThrow(() -> new MeetingNotFoundException(id));
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

        sendMeetingEmailForAttendants(meeting, meetingDate, start, finish, location, true, EmailType.CREATE);
        sendMeetingEmailForAttendants(meeting, meetingDate, start, finish, location, false, EmailType.CREATE);

        return meeting.getId();
    }

    private void sendMeetingEmailForAttendants(Meeting meeting, String meetingDate, String start,
        String finish, String location, boolean obligatory,
        EmailType emailType) {
        List<User> attendants = obligatory ? meeting.getRequiredAttendants() : meeting.getOptionalAttendants();
        for (User attendant : attendants) {
            String firstName = attendant.getName();
            String text = getMeetingText(firstName, meetingDate, start, finish, location, obligatory ? Constants.OBLIGATORY : Constants.NOT_OBLIGATORY);
            emailService.send(attendant.getEmail(), Constants.NEW_MEETING, emailType.getTemplateName(),
                Map.of("firstName", firstName, "obligatory", obligatory, "meetingDate", meetingDate));
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

    public MeetingUpdateDTO updateMeeting(MeetingCreateDTO meetingCreateDTO) {
        Meeting existingMeeting = findOne(meetingCreateDTO.getId());
        existingMeeting.setUpdatedAt(System.currentTimeMillis());
        existingMeeting.setTitle(meetingCreateDTO.getTitle());
        existingMeeting.setDescription(meetingCreateDTO.getDescription());
        existingMeeting.setLocation(meetingCreateDTO.getLocation());
        existingMeeting.setOtherLocation(meetingCreateDTO.getOtherLocation());
        existingMeeting.setRecurring(meetingCreateDTO.getRecurring());
        existingMeeting.setStartingTime(meetingCreateDTO.getStartingTime());
        existingMeeting.setFinishTime(meetingCreateDTO.getFinishTime());
        existingMeeting.setUpdatedBy(userRepository.findById(meetingCreateDTO.getCreatedByUser()).orElseThrow());
        existingMeeting.setRequiredAttendants(userRepository.findAllById(meetingCreateDTO.getRequiredAttendants()));
        existingMeeting.setOptionalAttendants(userRepository.findAllById(meetingCreateDTO.getOptionalAttendants()));
        return new MeetingUpdateDTO(meetingRepository.save(existingMeeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }

    private String createMeetingEmailText(String... parameters) {
        return String.format(mailingConfig.getMessageTemplate(), parameters);
    }
}
