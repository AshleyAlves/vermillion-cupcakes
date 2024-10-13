package com.vermillioncupcakes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.vermillioncupcakes.repository")
public class MainApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}

}
