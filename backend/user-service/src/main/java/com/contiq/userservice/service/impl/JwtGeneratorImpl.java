package com.contiq.userservice.service.impl;

import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.service.JwtGenerator;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtGeneratorImpl implements JwtGenerator {

    @Value("${jwt.secret}")
    public String secret;
    @Value("${app.jwttoken.message}")
    public String message;

    @Override
    public Map<String, String> generateToken(UserResponse userResponse) {

        String jwtToken="";
        jwtToken= Jwts.builder().
                setSubject(userResponse.getEmail()).
                setIssuedAt(new Date()).
                signWith(getSignKey(), SignatureAlgorithm.HS256).
                compact();
        Map<String,String> jwtTokenGen = new HashMap<>();
        jwtTokenGen.put("token",jwtToken);
        jwtTokenGen.put("message",message);

        return jwtTokenGen;
    }

    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(final String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
            return true;
        }catch (Exception ex) {
            return false;
        }
    }
}
