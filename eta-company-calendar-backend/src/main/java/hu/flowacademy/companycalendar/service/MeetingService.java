package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.MeetingNotFoundException;
import hu.flowacademy.companycalendar.exception.UserNotFoundException;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingUpdateDTO;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

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

    public MeetingDTO create(Long userId, MeetingDTO meetingDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Meeting meeting = meetingDTO.toEntity();
        meeting.setCreatedBy(user);
        meeting.setCreatedAt(System.currentTimeMillis());
        return new MeetingDTO(meetingRepository.save(meeting));
    }

    public Long createWithEmails(MeetingCreateDTO dto) {
        Meeting meeting = dto.toEntity(
            userRepository.findFirstByEmail(dto.getCreatedBy())
                .orElseThrow(() -> new UserNotFoundException("Cannot find user")),
            userRepository.findByEmailIn(dto.getRequiredAttendants()),
            userRepository.findByEmailIn(dto.getOptionalAttendants()));
        meeting.setCreatedAt(System.currentTimeMillis());
        return meetingRepository.save(meeting).getId();
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
        existingMeeting.setUpdatedBy(userRepository.findById(meetingCreateDTO.getUserId()).orElseThrow());
        existingMeeting.setRequiredAttendants(userRepository.findByEmailIn(meetingCreateDTO.getRequiredAttendants()));
        existingMeeting.setOptionalAttendants(userRepository.findByEmailIn(meetingCreateDTO.getOptionalAttendants()));
        return new MeetingUpdateDTO(meetingRepository.save(existingMeeting));
    }

    public void deleteById(Long id) {
        meetingRepository.deleteById(id);
    }
}
