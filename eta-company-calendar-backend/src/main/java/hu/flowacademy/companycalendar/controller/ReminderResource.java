package hu.flowacademy.companycalendar.controller;


import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderCreateDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderCreateDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderListItemDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderUpdateDTO;
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
    public List<ReminderListItemDTO> findAll() {
        return reminderService.findAll();
    }

    @GetMapping("/{id}")
    public Reminder findOne(@PathVariable Long id) {
        return reminderService.findOne(id);
    }

    @GetMapping("/own/{userId}")
    public List<ReminderDTO> findByUserId(@PathVariable Long userId) { return reminderService.findByUserId(userId);}

    @GetMapping("/user/{userId}")
    public List<ReminderListItemDTO> getReminderFromQuery(@PathVariable Long userId,
                                                  @RequestParam Long startingTimeFrom,
                                                  @RequestParam Long startingTimeTo) {
        return reminderService.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo);
    }


    @PostMapping
    public Long createWithEmails(@RequestBody ReminderCreateDTO dto) {
        return reminderService.createWithEmails(dto);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ReminderCreateDTO reminderCreateDTO) {
        reminderService.updateReminder(reminderCreateDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Long id) {
        reminderService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
