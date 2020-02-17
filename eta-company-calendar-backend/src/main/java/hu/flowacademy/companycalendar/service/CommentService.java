package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.CommentDTO;
import hu.flowacademy.companycalendar.repository.CommentRepository;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MeetingRepository meetingRepository;

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Comment findOne(Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    public Comment saveComment(CommentDTO commentDTO) {
        Comment comment = commentDTO.toEntity(
                userRepository.findById(commentDTO.getUserId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)),
                meetingRepository.findById(commentDTO.getMeetingId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
        );
        return commentRepository.save(comment);
    }

    public Comment updateComment(CommentDTO commentDTO) {
        Comment comment = findOne(commentDTO.getId());
        comment.setContent(commentDTO.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

}