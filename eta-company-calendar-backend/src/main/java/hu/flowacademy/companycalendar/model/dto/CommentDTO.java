package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;

import javax.persistence.*;
import java.util.stream.Collectors;

public class CommentDTO {

    private Long id;

    private String content;

    private User user;

    private Meeting meeting;

    public Comment toEntity() {
        return new Comment(
                id,
                content,
                user,
                meeting
        );
    }

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.user = comment.getUser();
        this.meeting = comment.getMeeting();
    }

}
