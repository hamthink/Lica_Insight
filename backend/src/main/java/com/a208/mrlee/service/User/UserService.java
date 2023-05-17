package com.a208.mrlee.service.User;

import com.a208.mrlee.dto.user.UserDTO;

import java.util.Map;

public interface UserService {
    boolean idExist(String id);
    boolean joinCheck(UserDTO userDTO , Map<String, Object> resultMap);
    Map<String, Object> login(String id , String password);
    boolean isCached(String id, String code);
    void join(UserDTO userDto);
}
