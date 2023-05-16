package com.a208.mrlee.service.User;

import com.a208.mrlee.config.mail.MailSendConfig;
import com.a208.mrlee.dto.user.UserDTO;
import com.a208.mrlee.entity.user.User;
import com.a208.mrlee.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MailSendConfig mailSendConfig;
    private final CacheManager cacheManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean idExist(String id) {
        User user = userRepository.findByEmail(id).orElse(null);
        if(user != null || cacheManager.getCache("email").get(id) != null){
            return false;
        }
        String code = mailSendConfig.sendEmail(id);
        cacheManager.getCache("email").put(id , code);
        return true;
    }

    public boolean isCached(String id, String code) {
        String cachedCode = cacheManager.getCache("email").get(id, String.class);
        if(code.equals(cachedCode)){
            cacheManager.getCache("auth").put(id , code);
            return true;
        }
        return false;
    }

    @Override
    public Map<String, Object> login(String id, String password) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        User user = userRepository.findByEmail(id).orElse(null);
        if(user == null) {
            resultMap.put("result" , FAIL);
            resultMap.put("msg" , "존재하지 않는 이메일입니다");
        }else if(!passwordEncoder.matches(password, user.getPassword())){
            resultMap.put("result" , FAIL);
            resultMap.put("msg" , "비밀번호가 일치하지 않습니다");
        }
        else{
            resultMap.put("result" , SUCCESS);
        }
        return resultMap;
    }

    public void join(UserDTO userDto){
        User user = User.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .gender(userDto.getGender())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .date(LocalDateTime.now())
                .build();
        userRepository.save(user);
    }

    @Override
    public boolean checkExist(String id) {
//        String code = cacheManager.getCache("auth").get(id, String.class);
        User user = userRepository.findByEmail(id).orElse(null);
        if(user != null
//                || code == null
        ){
            return true;
        }
        return false;
    }
}