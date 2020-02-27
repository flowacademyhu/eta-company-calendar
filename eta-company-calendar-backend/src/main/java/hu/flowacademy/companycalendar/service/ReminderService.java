package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.ReminderNotFoundException;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.ReminderCreateDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderListItemDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderUpdateDTO;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ReminderService {

    private final ReminderRepository reminderRepository;
    private final UserRepository userRepository;

    public List<Reminder> findAll() {
        return reminderRepository.findAll();
    }

    public Reminder findOne(Long id) {
        return reminderRepository.findById(id).orElseThrow(() -> new ReminderNotFoundException(id));
    }

    public List<ReminderListItemDTO> findByUserIdAndTimeRange(Long userId,
                                                              Long startingTimeFrom,
                                                              Long startingTimeTo) {
        return reminderRepository.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo)
            .stream().map(ReminderListItemDTO::new).collect(Collectors.toList());
    }

    public void createReminder(ReminderDTO reminderDTO) {
        Reminder reminder = reminderDTO.toEntity();
        Optional<User> u = userRepository.findById(reminderDTO.getUserId());
        if (u.isPresent()) {
            reminder.setUser(u.get());
            reminder.setCreatedAt(System.currentTimeMillis());
            reminderRepository.save(reminder);
        } else {
            throw new ReminderNotFoundException(reminderDTO.getId());
        }
    }

    public Long createWithEmails(ReminderCreateDTO dto) {
        Reminder reminder = dto.toEntity(
            userRepository.findFirstByEmail(dto.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found in DB")));
        reminder.setCreatedAt(System.currentTimeMillis());
        return reminderRepository.save(reminder).getId();
    }

    public ReminderUpdateDTO updateReminder(ReminderCreateDTO reminderCreateDTO) {
        Reminder existingReminder = findOne(reminderCreateDTO.getId());
        existingReminder.setTitle(reminderCreateDTO.getTitle());
        existingReminder.setDescription(reminderCreateDTO.getDescription());
        existingReminder.setStartingTime(reminderCreateDTO.getStartingTime());
        existingReminder.setUpdatedAt(System.currentTimeMillis());
        existingReminder.setRecurring(reminderCreateDTO.getRecurring());
        return new ReminderUpdateDTO(reminderRepository.save(existingReminder));
    }

    public void deleteById(Long id) {
        reminderRepository.deleteById(id);
    }

    public List<Reminder> findByUserId(Long userid) {
        return reminderRepository.findByUserId(userid);
    }

    /*public List<Reminder> findByUserIdAndAfterStartTime(Long userid, Long startTime) {
        return reminderRepository.findByUserIdAndAfterStartTime(userid, startTime);
    }*/
}
