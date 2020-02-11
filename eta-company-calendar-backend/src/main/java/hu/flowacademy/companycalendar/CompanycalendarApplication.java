package hu.flowacademy.companycalendar;

import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import hu.flowacademy.companycalendar.email.EmailService;
import hu.flowacademy.companycalendar.email.MGSSample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CompanycalendarApplication {


	public static void main(String[] args) throws UnirestException {
		SpringApplication.run(CompanycalendarApplication.class, args);
		JsonNode jsonNode = MGSSample.sendSimpleMessage();
		System.out.println(jsonNode.toString());

	}

}
