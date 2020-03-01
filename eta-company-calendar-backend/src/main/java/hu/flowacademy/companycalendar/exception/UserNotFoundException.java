package hu.flowacademy.companycalendar.exception;

public class UserNotFoundException extends NotFoundException{
  public UserNotFoundException(Long id) { super("Cannot find user with id: " + id); }
  public UserNotFoundException(String message) { super(message); }
}
