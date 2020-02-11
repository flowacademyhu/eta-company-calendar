package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;

    private String content;

    private Long userId;

    private Long meetingId;

    public Comment toEntity(User user, Meeting meeting ) {
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
        this.userId = comment.getUser().getId();
        this.meetingId = comment.getMeeting().getId();
    }

}
