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

    @Autowired
    private UserRepository userRepository;
    private MeetingRepository meetingRepository;



    private Long id;

    private String content;

    private Long userId;

    private Long meetingId;


    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        if (comment.getUser() != null) {
            this.userId = comment.getUser().getId();
        } else
        if (comment.getMeeting() != null) {
            this.meetingId = comment.getMeeting().getId();
        }
    }


    public Comment toEntity() {
        User user = userRepository.findById(id).orElseThrow();
        Meeting meeting = meetingRepository.findById(id).orElseThrow();
        return  new Comment(
                id,
                content,
                user,
                meeting
        );
    }



}
