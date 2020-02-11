package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.repository.ReminderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ReminderService {

    private final ReminderRepository reminderRepository;

    public List<Reminder> findAll() {
        return reminderRepository.findAll();
    }

    public Reminder findOne(Long id) {
        return reminderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Reminder create(Long id, ReminderDTO reminderDTO) {

    }
}
