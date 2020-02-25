package hu.flowacademy.companycalendar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public HttpStatus handleNotFoundException(NotFoundException u) {
    return HttpStatus.NOT_FOUND;
  }

  @ExceptionHandler(BadRequestException.class)
  public HttpStatus handleBadRequestException(BadRequestException e) {
    return HttpStatus.BAD_REQUEST;
  }
}
