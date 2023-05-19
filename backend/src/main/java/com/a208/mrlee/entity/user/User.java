package com.a208.mrlee.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "member")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_idx")
    private Long id;

    @JsonIgnore
    @Column(name="member_pwd")
    private String password;

    @Column(nullable = false ,name = "member_email")
    private String email;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_birthday")
    private LocalDate date;

    @Column(name = "member_gender")
    private String gender;
}
