package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Meeting;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

  @Query("SELECT DISTINCT m FROM "
      + "Meeting m LEFT OUTER JOIN m.requiredAttendants r LEFT OUTER JOIN m.optionalAttendants o "
      + "WHERE (m.createdBy.id = ?1 OR r.id = ?1 OR o.id = ?1) "
      + "AND m.startingTime BETWEEN ?2 and ?3")
  List<Meeting> findByUserIdAndTimeRange(Long userId, Long startingTimeFrom, Long StartingTimeTo);

  @Query("SELECT DISTINCT m FROM "
          + "Meeting m LEFT OUTER JOIN m.requiredAttendants r LEFT OUTER JOIN m.optionalAttendants o "
          + "WHERE m.createdBy.id = ?1 OR r.id = ?1 OR o.id = ?1")
  List<Meeting> findByInvitedUserId(Long userId);
}


