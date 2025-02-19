package com.java.NBE4_5_1_8;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Nbe4518Application {

	public static void main(String[] args) {
		SpringApplication.run(Nbe4518Application.class, args);
	}

}
