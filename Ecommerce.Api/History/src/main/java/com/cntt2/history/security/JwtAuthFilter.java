package com.cntt2.history.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private WebClient.Builder webClientBuilder;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication() == null) {
            UserInfo userData = isAuthTokenValid(authHeader);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userData, null, userData.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);

            //set userId to header
            request.setAttribute("userId",userData.getId());
        }
        filterChain.doFilter(request, response);
    }

    private UserInfo isAuthTokenValid(String token){
        UserInfo userData = null;
        try {
            userData = webClientBuilder.build().get()
                    .uri("http://user/api/v1/auth/authenticate?token="+token)
                    .retrieve()
                    .bodyToMono(UserInfo.class)
                    .block();
        }
        catch(HttpClientErrorException ex){
            if (ex.getStatusCode()== HttpStatus.UNAUTHORIZED) {
                return null;
            }
            throw ex;
        }
        return userData;
    }
}
