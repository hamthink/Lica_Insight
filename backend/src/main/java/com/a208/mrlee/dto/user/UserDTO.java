package com.a208.mrlee.dto.user;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String email;

    private String password;

    private String name;

    private String gender;

    private String code;

    private String birthday;

}
