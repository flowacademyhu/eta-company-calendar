package hu.flowacademy.companycalendar;

import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CompanycalendarApplication {

	public static void main(String[] args) throws UnirestException {
		SpringApplication.run(CompanycalendarApplication.class, args);
	}

}
