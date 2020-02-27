package hu.flowacademy.companycalendar.exception;

public class ProfileNotFoundException extends NotFoundException{
  public ProfileNotFoundException(Long id) {
    super("Cannot find profile with id: " + id);
  }
}
