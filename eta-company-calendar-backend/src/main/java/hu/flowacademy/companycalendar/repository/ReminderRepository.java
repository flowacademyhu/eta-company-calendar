package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Reminder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

  List<Reminder> findByUserId(Long userid);

 /* @Query("SELECT r FROM Reminder r WHERE r.user.id = ?1 AND r.endingTime > ?2")
  List<Reminder> findByUserIdAndAfterStartTime(Long userId, Long startTime);*/

  @Query("SELECT DISTINCT r FROM "
      + "Reminder r "
      + "WHERE r.user.id = ?1 "
      + "AND r.startingTime BETWEEN ?2 and ?3")
  List<Reminder> findByUserIdAndTimeRange(Long userId, Long startingTimeFrom, Long StartingTimeTo);
}
