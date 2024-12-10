package com.twd.SpringSecurityJWT.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow CORS only for frontend at localhost:63342
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")  // Allow CORS for specific frontend URL
                        .allowedMethods("*")  // Specify allowed HTTP methods
                        .allowedHeaders("*")  // Allow all headers
                        .allowCredentials(true);  // Allow credentials (e.g., cookies, authorization headers)

            }
        };
    }
}

