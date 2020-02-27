package hu.flowacademy.companycalendar.exception;

public class UserAlreadyExistException extends RuntimeException {
  public UserAlreadyExistException(String email) { super("User already exist with this email: " + email); }
}
