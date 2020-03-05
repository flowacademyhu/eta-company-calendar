package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findFirstByEmail(String email);

  List<User> findByEmailIn(List<String> emails);

  List<User> findByRole(Roles role);

  @Query("SELECT u FROM User u WHERE u.leader.id = ?1")
  List<User> findByLeaderId(Long leaderId);
}
