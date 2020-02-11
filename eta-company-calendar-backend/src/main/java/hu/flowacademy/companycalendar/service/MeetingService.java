package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;


    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Meeting findOne(Long id) {
        return meetingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }
}
