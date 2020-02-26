package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.exception.CommentNotFoundException;
import hu.flowacademy.companycalendar.exception.MeetingNotFoundException;
import hu.flowacademy.companycalendar.exception.UserNotFoundException;
import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.model.dto.CommentDTO;
import hu.flowacademy.companycalendar.repository.CommentRepository;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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
    return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
  }

  public Comment saveComment(CommentDTO commentDTO) {
    User user = userRepository.findById(commentDTO.getUserId()).orElseThrow(() -> new UserNotFoundException(commentDTO.getUserId()));
    Meeting meeting = meetingRepository.findById(commentDTO.getMeetingId()).orElseThrow(() -> new MeetingNotFoundException(commentDTO.getMeetingId()));
    return commentRepository.save(commentDTO.toEntity(user, meeting));
  }

  public Comment updateComment(CommentDTO commentDTO) {
    Comment comment = findOne(commentDTO.getId());
    comment.setContent(commentDTO.getContent());
    return commentRepository.save(comment);
  }

  public void deleteComment(Long id) {
    commentRepository.deleteById(id);
  }

  public List<Comment> findAllByMeetingId(Long meetingId) {
    return commentRepository.findAll().stream().filter(m -> m.getId().equals(meetingId))
        .collect(Collectors.toList());
  }
}
