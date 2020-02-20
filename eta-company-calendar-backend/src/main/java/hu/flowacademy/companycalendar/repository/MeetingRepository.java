package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Meeting;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

  @Query("SELECT DISTINCT m FROM  Meeting m INNER JOIN m.requiredAttendants a WHERE a.id = ?1")
  List<Meeting> findByQuery(Long userId);

}
