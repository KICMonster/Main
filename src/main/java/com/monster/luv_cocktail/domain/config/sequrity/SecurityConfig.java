 package com.monster.luv_cocktail.domain.config.sequrity;

import com.monster.luv_cocktail.domain.filter.JwtAuthenticationFilter;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.addFilterBefore(this.jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class).cors((cors) -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(Arrays.asList("https://luvcocktail.site", "https://localhost:5174"));
            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            config.setAllowedHeaders(Arrays.asList("*"));
            config.setAllowCredentials(true);
            cors.configurationSource((request) -> {
                return config;
            });
        }).csrf((csrf) -> {
            csrf.disable();
        }).sessionManagement((session) -> {
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        }).authorizeHttpRequests((auth) -> {
            ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)auth
//					// 태연 한줄 사용
					.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/data/**", "/api/cocktail/**" ,"/api/weather/**" , "/api/gis/**", "/api/snack/**", "/api/search/**", "/api/myPage/**" , "/api/custom/**" , "/api/recommendations/**", "/api/login/**", "/api/view/**" ).permitAll()
            		.requestMatchers(HttpMethod.OPTIONS, new String[]{"/api/authenticate", "/api/join/emails/verification-requests", "/api/join/emails/verifications", "/api/join/submit", "/api/weather/today", "/api/search/chart","/api/weather/default","/api/login"})).permitAll()
                    .requestMatchers(HttpMethod.POST, new String[]{"/api/search/chart","/api/login", "/api/view/cocktails/{id}"})).permitAll()
                    .requestMatchers(HttpMethod.PUT, new String[]{"/api/view/cocktails/{id}"})).permitAll()
                    .requestMatchers(HttpMethod.GET, new String[]{"/api/weather/today", "/api/search/cocktails", "/api/search/chart","/api/weather/default"})).permitAll()
                    .requestMatchers(HttpMethod.DELETE, new String[]{"/api/join/withdraw"})).permitAll()
                    .requestMatchers(new String[]{"/api/authenticate", "/api/join/emails/verification-requests", "/api/join/emails/verifications", "/api/join/submit","/api/weather/default"})).permitAll()
                    .requestMatchers(HttpMethod.OPTIONS, new String[]{"/api/search/submitTaste", "/api/search/recommend"})).hasAuthority("USER").anyRequest()).authenticated();
        }).oauth2Login((oauth2Login) -> {
            ((OAuth2LoginConfigurer)oauth2Login.defaultSuccessUrl("/oauth2/success", true)).failureUrl("/login?error=true").permitAll();
        });
        return http.build();
    }
}

