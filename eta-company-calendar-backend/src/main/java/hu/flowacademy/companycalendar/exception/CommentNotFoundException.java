package hu.flowacademy.companycalendar.exception;

public class CommentNotFoundException extends NotFoundException {
  public CommentNotFoundException(Long id) { super("Cannot find comment with id: " + id); }
}
