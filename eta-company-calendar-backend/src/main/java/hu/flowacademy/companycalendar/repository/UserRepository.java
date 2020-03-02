package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findFirstByEmail(String email);

  List<User> findByEmailIn(List<String> emails);

  List<User> findByRole(Roles role);

}
