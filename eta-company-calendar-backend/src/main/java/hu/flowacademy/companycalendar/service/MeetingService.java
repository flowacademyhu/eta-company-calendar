package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;


    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> findOne(Long id) {
        return meetingRepository.findById(id);
    }
}
