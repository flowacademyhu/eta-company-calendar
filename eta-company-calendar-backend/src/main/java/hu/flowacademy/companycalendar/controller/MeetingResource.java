package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.service.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MeetingDTO> createMeeting(@RequestBody MeetingDTO meetingDTO) {
        Meeting meeting = meetingService.create(meetingDTO);
        meetingDTO.meetingDTOFromMeeting(meeting);
        return ResponseEntity.ok(meetingDTO);
    }

    @PutMapping
    public ResponseEntity updateMeeting(@RequestBody MeetingDTO meetingDTO) {
        return meetingService.updateMeeting(meetingDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteById(id);
        return ResponseEntity.ok().build();
    }




}
