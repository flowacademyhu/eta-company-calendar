package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

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
        return reminderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Reminder create(Long id, ReminderDTO reminderDTO) {
        Reminder reminder = new Reminder();
        reminder.reminderFromReminderDTO(reminderDTO);
        reminder.setUser(userRepository.findById(id).get());
        return reminderRepository.save(reminder);
    }

    public ResponseEntity<Void> updateReminder(ReminderDTO reminderDTO) {
        Reminder existingReminder = findOne(reminderDTO.getId());
        existingReminder.setTitle(reminderDTO.getTitle());
        existingReminder.setDescription(reminderDTO.getDescription());
        existingReminder.setStartingTime(reminderDTO.getStartingTime());
        existingReminder.setEndingTime(reminderDTO.getEndingTime());
        existingReminder.setRecurring(reminderDTO.getRecurring());
        reminderRepository.save(existingReminder);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
