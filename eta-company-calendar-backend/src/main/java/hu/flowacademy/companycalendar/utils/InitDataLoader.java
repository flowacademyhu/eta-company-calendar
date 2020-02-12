package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.Roles;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.List;


@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        createUsers();
    }

    private void createUsers() {
        var admin = User.builder()
                .email("admin1@test.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Roles.ADMIN)
                .build();
        var user = User.builder()
                .email("user1@test.com")
                .password(passwordEncoder.encode("user123"))
                .role(Roles.USER)
                .build();
        userRepository.saveAll(List.of(admin, user));
    }
}
