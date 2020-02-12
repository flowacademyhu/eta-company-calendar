package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import hu.flowacademy.companycalendar.repository.MeetingRepository;
import hu.flowacademy.companycalendar.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;
    private String content;
    private Long userId;
    private Long meetingId;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        if (comment.getUser() != null) {
            this.userId = comment.getUser().getId();
        } else {
            throw new RuntimeException("User not found with this id");
        }
        if (comment.getMeeting() != null) {
            this.meetingId = comment.getMeeting().getId();
        } else {
            throw new RuntimeException("Meeting not found wit this id");
        }
    }

    public Comment toEntity(User user, Meeting meeting) {
        return new Comment(
                id,
                content,
                user,
                meeting
        );
    }
}
