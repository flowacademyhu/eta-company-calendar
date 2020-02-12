package hu.flowacademy.companycalendar.utils;

import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Component
@Transactional
@AllArgsConstructor
public class InitDataLoader {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        userRepository.save(User.builder().id(1L).build());
    }
}
