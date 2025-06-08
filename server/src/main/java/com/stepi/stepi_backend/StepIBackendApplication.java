package com.stepi.stepi_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(scanBasePackages = "com.stepi", exclude = { SecurityAutoConfiguration.class })
@EntityScan(basePackages = "com.stepi.model")
@EnableJpaRepositories(basePackages = "com.stepi.repository")
public class StepIBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StepIBackendApplication.class, args);
	}

}
