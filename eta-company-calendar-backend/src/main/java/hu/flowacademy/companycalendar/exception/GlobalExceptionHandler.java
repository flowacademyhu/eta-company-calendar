package hu.flowacademy.companycalendar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

  @ExceptionHandler
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public HttpStatus handleNotFoundException(NotFoundException e) {
    System.err.println(e.getMessage());
    return HttpStatus.NOT_FOUND;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public HttpStatus handleBadRequestException(BadRequestException e) {
    System.err.println(e.getMessage());
    return HttpStatus.BAD_REQUEST;
  }
}
