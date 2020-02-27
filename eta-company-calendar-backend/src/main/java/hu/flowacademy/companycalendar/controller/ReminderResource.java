package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.MeetingCreateDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderCreateDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderListItemDTO;
import hu.flowacademy.companycalendar.model.dto.ReminderUpdateDTO;
import hu.flowacademy.companycalendar.service.ReminderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /*@GetMapping("/user/{userid}")
    public List<Reminder> findByUserId(@PathVariable Long userid) { return reminderService.findByUserId(userid);}*/

    @GetMapping("/user/{userId}")
    public List<ReminderListItemDTO> getReminderFromQuery(@PathVariable Long userId,
                                                  @RequestParam Long startingTimeFrom,
                                                  @RequestParam Long startingTimeTo) {
        return reminderService.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo);
    }

    /*@GetMapping("user/time/{userid}")
    public List<Reminder> findByUserIdAndAfterStartTime(@PathVariable Long userid,
                                                          @RequestParam Long startTime ) {
        return reminderService.findByUserIdAndAfterStartTime(userid, startTime);
    }*/


    /*@PostMapping
    public ResponseEntity<Void> createReminder(@RequestBody ReminderDTO reminderDTO) {
        reminderService.createReminder(reminderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }*/

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
