package hu.flowacademy.companycalendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class CompanycalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompanycalendarApplication.class, args);
	}

}
