package com.a208.mrlee.service.User;

import java.util.Map;

public interface UserService {
    boolean idExist(String id);
    Map<String, Object> login(String id , String password);
    boolean isCached(String id, String code);
    void join(String id , String password);
}
