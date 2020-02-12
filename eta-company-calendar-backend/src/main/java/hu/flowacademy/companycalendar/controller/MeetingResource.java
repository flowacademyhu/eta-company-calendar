package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.service.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@AllArgsConstructor
public class MeetingResource {

    private final MeetingService meetingService;

    @GetMapping
    public List<MeetingDTO> getAll() {
        return meetingService.findAll();
    }

    @GetMapping("/{id}")
    public MeetingDTO getOne(@PathVariable Long id) {
        return meetingService.findOne(id);
    }

    @PostMapping("/{id}")
    public MeetingDTO createMeeting(@PathVariable Long id, @RequestBody MeetingDTO meetingDTO) {
        return meetingService.create(id, meetingDTO);
    }

    @PutMapping("/{id}")
    public MeetingDTO updateMeeting(@PathVariable Long id, @RequestBody MeetingDTO meetingDTO) {
        return meetingService.updateMeeting(id, meetingDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
