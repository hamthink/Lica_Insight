package com.a208.mrlee.controller.mail;

import com.a208.mrlee.dto.user.UserDTO;
import com.a208.mrlee.service.Jwt.JwtService;
import com.a208.mrlee.service.User.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@Api("USER Api")
@RequiredArgsConstructor
public class UserController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/email")
    public ResponseEntity<?> email(@RequestParam String email){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        if(userService.idExist(email)){
            resultMap.put("possible" , true);
            resultMap.put("result", SUCCESS);
        }else{
            resultMap.put("possible" , false);
            resultMap.put("result", FAIL);
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(@RequestBody UserDTO userDto){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        if(userService.isCached(userDto.getEmail() , userDto.getCode())){
            resultMap.put("done" , true);
            resultMap.put("result", SUCCESS);
        }else{
            resultMap.put("done" , false);
            resultMap.put("result", FAIL);
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDto){
        Map<String, Object> resultMap = userService.login(userDto.getEmail() , userDto.getPassword());
        if(resultMap.get("result").equals(SUCCESS)){
            String accessToken = jwtService.login(userDto.getEmail());
            resultMap.put("access-token", accessToken);
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDto){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        if(userService.joinCheck(userDto , resultMap)){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        userService.join(userDto);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/test")
    public void test(String jwt){
        System.out.println(jwtService.convert(jwt));
    }

}
