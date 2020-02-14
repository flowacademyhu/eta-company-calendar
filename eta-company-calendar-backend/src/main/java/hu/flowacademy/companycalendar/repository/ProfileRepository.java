package hu.flowacademy.companycalendar.repository;

import hu.flowacademy.companycalendar.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
