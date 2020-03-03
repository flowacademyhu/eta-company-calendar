package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.dto.AbstractListItemDTO;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class EventService {

  private final MeetingService meetingService;
  private final ReminderService reminderService;

  public List<AbstractListItemDTO> findByUserIdAndTimeRange(Long userId,
      Long startingTimeFrom,
      Long startingTimeTo) {
    var events = new ArrayList<AbstractListItemDTO>();
    events.addAll(meetingService
        .findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo));
    events.addAll(reminderService
        .findByUserIdAndTimeRange(userId, startingTimeFrom, startingTimeTo));
    return events;
  }
}
