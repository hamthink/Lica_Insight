package com.a208.mrlee.service.Jwt;

import com.a208.mrlee.util.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImpl implements JwtService{

    @Value("${jwt.secret}")
    private String secretKey;

    private Long expriredMs = 1000 * 60 * 60l;

    public String login(String userName){
        return JwtUtil.createJwt(userName , secretKey , expriredMs);
    }
    public String convert(String userName){
        return JwtUtil.getUserNameFromJwt(userName , secretKey);
    }
}
