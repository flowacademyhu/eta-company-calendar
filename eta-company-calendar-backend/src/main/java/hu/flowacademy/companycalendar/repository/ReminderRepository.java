package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Reminder;
import hu.flowacademy.companycalendar.model.dto.ReminderListItemDTO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

  @Query("SELECT DISTINCT r FROM "
      + "Reminder r "
      + "WHERE r.createdBy.id = ?1 "
      + "AND r.startingTime BETWEEN ?2 and ?3")
  List<Reminder> findByUserIdAndTimeRange(Long userId, Long startingTimeFrom, Long StartingTimeTo);

  @Query("SELECT DISTINCT r FROM "
      + "Reminder r "
      + "WHERE r.createdBy.id = ?1 ")
  List<Reminder> findByUserId(Long userId);
}
