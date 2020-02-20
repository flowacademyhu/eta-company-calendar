package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Reminder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

  List<Reminder> findByUserId(Long userid);
}
