package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
