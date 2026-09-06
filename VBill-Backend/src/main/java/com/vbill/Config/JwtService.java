package com.vbill.Config;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    /*
     * JWT Secret Key
     *
     * Later move this to application.properties
     */
    private static final String SECRET_KEY =
            "VBillSuperSecretKeyForJWTAuthentication2026VerySecureKey123456";

    /*
     * JWT validity = 24 hours
     */
    private static final long JWT_EXPIRATION =
            1000L * 60 * 60 * 24;


    /*
     * Create signing key
     */
    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }


    /*
     * Generate JWT Token
     */
    public String generateToken(
            Long userAccountId,
            String email
    ) {

        return Jwts.builder()

                .subject(email)

                .claim(
                        "userAccountId",
                        userAccountId
                )

                .issuedAt(
                        new Date()
                )

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + JWT_EXPIRATION
                        )
                )

                .signWith(
                        getSigningKey()
                )

                .compact();
    }


    /*
     * Extract email from JWT
     */
    public String extractEmail(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(
                        getSigningKey()
                )

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();
    }


    /*
     * Validate JWT
     */
    public boolean isTokenValid(
            String token
    ) {

        try {

            Jwts.parser()

                    .verifyWith(
                            getSigningKey()
                    )

                    .build()

                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}