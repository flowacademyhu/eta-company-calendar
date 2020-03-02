package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.service.ReminderService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/user/{userid}")
    public List<Reminder> findByUserId(@PathVariable Long userid) { return reminderService.findByUserId(userid);}

    @GetMapping("user/time/{userid}")
    public List<Reminder> findByUserIdAndAfterStartTime(@PathVariable Long userid,
                                                          @RequestParam Long startTime ) {
        return reminderService.findByUserIdAndAfterStartTime(userid, startTime);
    }


    @PostMapping
    public ResponseEntity<Void> createReminder(@RequestBody ReminderDTO reminderDTO) {
        reminderService.createReminder(reminderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<ReminderDTO> update(@RequestBody ReminderDTO reminderDTO) {
        return ResponseEntity.ok(new ReminderDTO(reminderService.updateReminder(reminderDTO)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Long id) {
        reminderService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
