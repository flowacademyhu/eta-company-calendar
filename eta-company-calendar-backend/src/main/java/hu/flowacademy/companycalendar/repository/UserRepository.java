package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findFirstByEmail(String email);

  List<User> findByEmailIn(List<String> emails);

}
