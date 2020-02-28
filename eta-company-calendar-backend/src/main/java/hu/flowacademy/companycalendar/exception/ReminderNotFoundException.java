package hu.flowacademy.companycalendar.exception;

public class ReminderNotFoundException extends NotFoundException {
  public ReminderNotFoundException(Long id) { super("Cannot find reminder with id: " + id); }
}
