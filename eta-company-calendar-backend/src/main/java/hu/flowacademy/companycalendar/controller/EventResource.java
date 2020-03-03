package hu.flowacademy.companycalendar.controller;

import hu.flowacademy.companycalendar.model.dto.AbstractListItemDTO;
import hu.flowacademy.companycalendar.service.EventService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
@AllArgsConstructor
public class EventResource {

  private final EventService eventService;

  @GetMapping("/user/{userId}")
  public List<AbstractListItemDTO> getFromQuery(@PathVariable Long userId,
      @RequestParam Long startingTimeFrom,
      @RequestParam Long startingTimeTo) {
    return eventService.findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo);
  }
}
