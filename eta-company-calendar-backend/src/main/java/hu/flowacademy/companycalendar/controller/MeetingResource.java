package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.service.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@AllArgsConstructor
public class MeetingResource {

    private final MeetingService meetingService;

    @GetMapping("")
    public List<Meeting> getAll() {
        return meetingService.findAll();
    }

    @GetMapping("/{id}")
    public Meeting getOne(@PathVariable Long id) {
        return meetingService.findOne(id);
    }

    @PostMapping("")
    public Meeting createMeeting(@RequestBody Meeting meeting) {
    return meetingService.create(meeting);
    }
    
}
