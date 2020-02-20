package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.dto.MeetingDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingListItemDTO;
import hu.flowacademy.companycalendar.model.dto.MeetingQueryDTO;
import hu.flowacademy.companycalendar.service.MeetingService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("query")
    public List<MeetingListItemDTO> getFromQuery(@Valid MeetingQueryDTO queryParams) {
        System.out.println(queryParams);
        return List.of(MeetingListItemDTO.builder()
                        .title("it works")
                        .startingTime(System.currentTimeMillis())
                        .finishTime(System.currentTimeMillis() + 100000)
                        .build());
    }

    @GetMapping("/{id}")
    public MeetingDTO getOne(@PathVariable Long id) {
        return meetingService.findOne(id);
    }

    @PostMapping("/{userId}")
    public MeetingDTO createMeeting(@PathVariable Long userId, @RequestBody MeetingDTO meetingDTO) {
        return meetingService.create(userId, meetingDTO);
    }

    @PutMapping("/{userId}")
    public MeetingDTO updateMeeting(@PathVariable Long userId, @RequestBody MeetingDTO meetingDTO) {
        return meetingService.updateMeeting(userId, meetingDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
