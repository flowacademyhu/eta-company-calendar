package hu.flowacademy.companycalendar.model.dto;

import hu.flowacademy.companycalendar.model.Comment;
import hu.flowacademy.companycalendar.model.Meeting;
import hu.flowacademy.companycalendar.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

  private Long id;
  private String content;
  private Long userId;
  private Long meetingId;

  public CommentDTO(Comment comment) {
    if (comment.getUser() != null && comment.getMeeting() != null) {
      this.userId = comment.getUser().getId();
      this.meetingId = comment.getMeeting().getId();
    } else {
      throw new IllegalArgumentException("User or Meeting not found with this id");
    }
    this.id = comment.getId();
    this.content = comment.getContent();
  }

  public Comment toEntity(User user, Meeting meeting) {
    return new Comment(id, content, user, meeting);
  }
}
