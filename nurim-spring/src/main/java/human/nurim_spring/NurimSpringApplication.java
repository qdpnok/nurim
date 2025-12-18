package human.nurim_spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class NurimSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(NurimSpringApplication.class, args);
	}

}
