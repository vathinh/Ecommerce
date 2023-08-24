package com.cntt2.user.dto;

import com.cntt2.user.model.User;
import lombok.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String id;
    private boolean isActive;
    private String username;
    private String password;
    private String fullname;
    private String email;
    private Long phone;
    private String avatar;
    private Date createdDate;
    private Date updatedDate;

    public AuthResponse(
            String token,
            String id,
            Boolean isActive,
            String username,
            String password,
            String fullname,
            String email,
            Long phone,
            String avatar,
            Date createdDate,
            Date updatedDate
    ) {
        this.token = token;
        this.id = id;
        this.isActive = isActive;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public AuthResponse(User user) {
        this.id = user.getId();
//        this.isActive = user.get
        this.username = user.getUsername();
        this.fullname = user.getFullname();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.avatar = user.getAvatar();
        this.createdDate = user.getCreatedDate();
        this.updatedDate = user.getUpdatedDate();
    }
}
