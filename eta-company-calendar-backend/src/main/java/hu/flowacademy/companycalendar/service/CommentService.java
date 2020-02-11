package hu.flowacademy.companycalendar.service;

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

    public Comment saveComment(Comment comment) {
        Comment newComment = new Comment();
        newComment.setContent(comment.getContent());
        newComment.setUser(comment.getUser());
        newComment.setMeeting(comment.getMeeting());
        return commentRepository.save(newComment);
    }

    public Comment updateComment(Comment comment) {
        Comment newComment = new Comment();
        newComment.setId(comment.getId());
        newComment.setContent(comment.getContent());
        newComment.setUser(comment.getUser());
        newComment.setMeeting(comment.getMeeting());
        return commentRepository.save(newComment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }


    public Comment fromDTOToComment(CommentDTO commentDTO) {
        User user = userRepository.findById(commentDTO.getUserId()).orElseThrow();
        Meeting meeting = meetingRepository.findById(commentDTO.getMeetingId()).orElseThrow();
        return new Comment(
                commentDTO.getId(),
                commentDTO.getContent(),
                user,
                meeting
        );
    }

}
