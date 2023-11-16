package com.cntt2.user.controller;

import com.cntt2.user.dto.UserRequest;
import com.cntt2.user.dto.UserResetPwd;
import com.cntt2.user.model.User;
import com.cntt2.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/user")
public record UserController(UserService userService) {
    //get all users
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return userService.getUsers();
    }

    //get single user
    @GetMapping(path = "{userId}")
    public ResponseEntity<User> getSingleUser(@PathVariable("userId") String id) {
        return userService.getSingleUser(id);
    }

    //update user
    @PutMapping(path = "{userId}")
    public ResponseEntity<User> updateUser(@PathVariable("userId") String id, @RequestBody UserRequest userRequest) {
        return userService.updateUser(id, userRequest);
    }

    //delete user
    @DeleteMapping(path = "{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") String id) {
        return userService.deleteUser(id);
    }
}
