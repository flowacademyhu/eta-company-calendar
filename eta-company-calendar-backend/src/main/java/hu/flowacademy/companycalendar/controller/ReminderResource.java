package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.service.ReminderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@AllArgsConstructor
public class ReminderResource {

    private final ReminderService reminderService;

    @GetMapping
    public List<Reminder> findAll() {
        return reminderService.findAll();
    }

    @GetMapping("/{id}")
    public Reminder findOne(@PathVariable Long id) {
        return reminderService.findOne(id);
    }

    @PostMapping
    public ResponseEntity<ReminderDTO> createReminder(@PathVariable Long id, @RequestBody ReminderDTO reminderDTO) {
        Reminder reminder = reminderService.create(id, reminderDTO);
        reminderDTO.reminderDTOFromReminder(reminder);
        return ResponseEntity.ok(reminderDTO);
    }


}
