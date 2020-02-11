package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}
