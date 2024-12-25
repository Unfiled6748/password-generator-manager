package com.unfiled6748.password_generator_manager.backend.controllers;

import com.unfiled6748.password_generator_manager.backend.config.UserAuthProvider;
import com.unfiled6748.password_generator_manager.backend.dto.CredentialsDto;
import com.unfiled6748.password_generator_manager.backend.dto.SignUpDto;
import com.unfiled6748.password_generator_manager.backend.dto.UserDto;
import com.unfiled6748.password_generator_manager.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final UserService userService;
    private final UserAuthProvider userAuthProvider;
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthProvider.createToken(userDto.getUsername()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
        UserDto createdUser = userService.register(signUpDto);
        createdUser.setToken(userAuthProvider.createToken(createdUser.getUsername()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId()))
                .body(createdUser);
    }
}
