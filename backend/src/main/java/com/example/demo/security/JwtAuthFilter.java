package com.example.demo.security;


import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getAuthToken(request);
        if (token != null && !token.isBlank()) {
            try {
                Claims claims = jwtService.extractClaims(token);
                setSecurityContext(claims.getSubject());
                filterChain.doFilter(request, response);
            } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
                response.setStatus(401);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private String getAuthToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null) {
            return authorization.replace("Bearer", "").trim();
        }
        return null;
    }

    private void setSecurityContext(String subject) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(subject, "", List.of());
        SecurityContextHolder.getContext().setAuthentication(token);
    }
}
