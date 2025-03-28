package org.example.blacklist.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTUtil {
    private static final String SECRET_KEY = "EsteEsUnSecretoMuySeguroParaJWT12345678"; // Mínimo 32 caracteres
    private static final long EXPIRATION_TIME = 86400000; // 1 día en milisegundos

    // Convertir la clave en un formato válido para HMAC
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Generar el token
    public String generateToken(Integer id) {
        return Jwts.builder()
                .setSubject(id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256) // 🔹 Método actualizado
                .compact();
    }

    public String extractId(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            return getClaims(token).getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY) // 🔹 Método actualizado
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}


