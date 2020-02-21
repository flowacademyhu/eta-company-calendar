package hu.flowacademy.companycalendar.service;

import com.sun.xml.bind.v2.TODO;
import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.User;
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
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ReminderService {

    private final ReminderRepository reminderRepository;
    private final UserRepository userRepository; //TODO: userService

    public List<Reminder> findAll() {
        return reminderRepository.findAll();
    }

    public Reminder findOne(Long id) {
        return reminderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void createReminder(ReminderDTO reminderDTO) {
        Reminder reminder = reminderDTO.toEntity();
        Optional<User> u = userRepository.findById(reminderDTO.getUserId());
        if (u.isPresent()) {
            reminder.setUser(u.get());
            reminderRepository.save(reminder);
        } else {
            throw new RuntimeException("User cannot be found!");
        }
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

    public void deleteById(Long id) {
        reminderRepository.deleteById(id);
    }

    public List<Reminder> findByUserId(Long userid) {
        return reminderRepository.findByUserId(userid);
    }

    public List<Reminder> findByUserIdAndAfterCurrentTime(Long userid, Long currentTime) {
        return reminderRepository.findByUserIdAndAfterCurrentTime(userid, currentTime);
    }
}
