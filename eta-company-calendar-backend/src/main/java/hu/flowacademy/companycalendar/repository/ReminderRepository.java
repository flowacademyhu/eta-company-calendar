package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Reminder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

  List<Reminder> findByUserId(Long userid);

  @Query(value = "SELECT * FROM reminder  WHERE user_id = ?1 AND ending_time > ?2", nativeQuery = true)
  List<Reminder> findByUserIdAndAfterCurrentTime(Long userId, Long currentTime);
}
