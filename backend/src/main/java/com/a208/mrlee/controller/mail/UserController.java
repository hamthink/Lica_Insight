package com.a208.mrlee.controller.mail;

import com.a208.mrlee.service.Jwt.JwtService;
import com.a208.mrlee.service.User.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Api("Mail Api")
@RequiredArgsConstructor
public class UserController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/email")
    public ResponseEntity<?> email(String email , String domain){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String id = email + "@" + domain;
        if(userService.idExist(id)){
            resultMap.put("exist" , false);
        }else{
            resultMap.put("exist" , true);
        }
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(String email , String domain , String code){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String id = email + "@" + domain;
        if(userService.isCached(id , code)){
            resultMap.put("done" , true);
        }else{
            resultMap.put("done" , false);
        }
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> code(String email , String domain , String password){
        String id = email + "@" + domain;
        Map<String, Object> resultMap = userService.login(id , password);
        if(resultMap.get("result").equals(SUCCESS)){
            String accessToken = jwtService.login(id);
            resultMap.put("access-token", accessToken);
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(String email , String domain , String password){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String id = email + "@" + domain;
        userService.join(id , password);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/test")
    public void test(String jwt){
        System.out.println(jwtService.convert(jwt));
    }

}
