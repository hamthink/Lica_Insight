package com.a208.mrlee.service.Jwt;

public interface JwtService {
    String login(String userName);
    String convert(String userName);
}
