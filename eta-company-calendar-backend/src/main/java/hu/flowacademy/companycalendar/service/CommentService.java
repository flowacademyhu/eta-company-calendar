package hu.flowacademy.companycalendar.service;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.dto.CommentDTO;
import hu.flowacademy.companycalendar.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Comment findOne(Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    public Comment saveComment(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setUser(commentDTO.getUser());
        comment.setMeeting(commentDTO.getMeeting());
        return commentRepository.save(comment);
    }

    public Comment updateComment(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setContent(commentDTO.getContent());
        comment.setUser(commentDTO.getUser());
        comment.setMeeting(commentDTO.getMeeting());
        return commentRepository.save(comment);

    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

}
