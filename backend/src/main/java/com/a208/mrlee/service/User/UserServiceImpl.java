package com.a208.mrlee.service.User;

import com.a208.mrlee.config.mail.MailSendConfig;
import com.a208.mrlee.entity.user.User;
import com.a208.mrlee.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        System.out.println(code);
        cacheManager.getCache("email").put(id , code);
        return true;
    }

    public boolean isCached(String id, String code) {
        String cachedCode = cacheManager.getCache("email").get(id, String.class);
        return code.equals(cachedCode);
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

    public void join(String id , String password){
        User user = User.builder()
                .email(id)
                .password(passwordEncoder.encode(password))
                .build();
        userRepository.save(user);
    }
}
