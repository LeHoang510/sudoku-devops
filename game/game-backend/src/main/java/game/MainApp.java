package game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApp { // run on port 4445 (it is defined on resources/application.properties)
	public static void main(final String[] args) {
		System.out.println("Game backend is running...");
		SpringApplication.run(MainApp.class, args);
	}
}
