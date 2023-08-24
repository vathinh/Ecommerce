package com.cntt2.user.service;

import com.cntt2.user.dto.UserRequest;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    ///////////////////////////////////////////////////////////

    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity<User> getSingleUser(String userId) {
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(userData.get(), HttpStatus.OK);
    }

    public ResponseEntity<User> updateUser(String userId, UserRequest request) {
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(request.username() != null)
            userData.get().setUsername(request.username());
        if(request.password() != null)
            userData.get().setPassword(request.password());
        if(request.fullname() != null)
            userData.get().setFullname(request.fullname());
        if(request.avatar() != null)
            userData.get().setAvatar(request.avatar());


        return new ResponseEntity<User>(
                userRepository.save(userData.get()),
                HttpStatus.OK) ;
    }

    public ResponseEntity deleteUser(String userId) {
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        userRepository.deleteById(userId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
