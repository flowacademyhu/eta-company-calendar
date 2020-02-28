package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.ReminderNotFoundException;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
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

    public void createReminder(ReminderDTO reminderDTO) {
        Reminder reminder = reminderDTO.toEntity();
        Optional<User> u = userRepository.findById(reminderDTO.getUserId());
        if (u.isPresent()) {
            reminder.setUser(u.get());
            reminderRepository.save(reminder);
        } else {
            throw new ReminderNotFoundException(reminderDTO.getId());
        }
    }

    public Reminder updateReminder(ReminderDTO reminderDTO) {
        Reminder existingReminder = findOne(reminderDTO.getId());
        existingReminder.setTitle(reminderDTO.getTitle());
        existingReminder.setDescription(reminderDTO.getDescription());
        existingReminder.setStartingTime(reminderDTO.getStartingTime());
        existingReminder.setEndingTime(reminderDTO.getEndingTime());
        existingReminder.setRecurring(reminderDTO.getRecurring());
        return reminderRepository.save(existingReminder);
    }

    public void deleteById(Long id) {
        reminderRepository.deleteById(id);
    }

    public List<Reminder> findByUserId(Long userid) {
        return reminderRepository.findByUserId(userid);
    }

    public List<Reminder> findByUserIdAndAfterStartTime(Long userid, Long startTime) {
        return reminderRepository.findByUserIdAndAfterStartTime(userid, startTime);
    }
}
