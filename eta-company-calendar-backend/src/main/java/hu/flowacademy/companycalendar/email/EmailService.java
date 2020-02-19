package hu.flowacademy.companycalendar.email;

public interface EmailService {
    void send(String to, String subject, EmailType emailType, Object... bodyParams);
}