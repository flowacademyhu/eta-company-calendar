package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.service.ReminderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ReminderResource {

    private final ReminderService reminderService;

    @GetMapping("/reminders")
    public List<Reminder> findAll() {
        return reminderService.findAll();
    }

    @GetMapping("/reminders/{id}")
    public Reminder findOne(@PathVariable Long id) {
        return reminderService.findOne(id);
    }
}
