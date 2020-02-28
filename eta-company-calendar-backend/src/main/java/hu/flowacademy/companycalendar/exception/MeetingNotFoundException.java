package hu.flowacademy.companycalendar.exception;

public class MeetingNotFoundException extends NotFoundException {
  public MeetingNotFoundException(Long id) { super("Cannot find meeting with id: " + id); }
}
