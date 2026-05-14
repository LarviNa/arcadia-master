package com.arcadiacomics.ventas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;

@Component
@Slf4j
public class JwtUtils {

    private final SecretKey secretKey;

    public JwtUtils(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /** Extrae el email (subject) del token. */
    public String getEmailDesdeToken(String token) {
        return getClaims(token).getSubject();
    }

    /** Extrae el rol del token. */
    public String getRolDesdeToken(String token) {
        return getClaims(token).get("rol", String.class);
    }

    /** Valida firma y expiración. Devuelve true si el token es válido. */
    public boolean validarToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT expirado: {}", e.getMessage());
        } catch (JwtException e) {
            log.warn("JWT inválido: {}", e.getMessage());
        }
        return false;
    }

    // ── Privado ───────────────────────────────────────────

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
