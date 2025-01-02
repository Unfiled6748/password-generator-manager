package com.unfiled6748.password_generator_manager.backend.controllers;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class GeneratedPasswordController {
    @GetMapping("/generatedPasswords/new")
    public ResponseEntity<String> generatePassword(@RequestParam() int length) {
        //public ResponseEntity<String> generatePassword() {
        // int length = 12;
        List<CharacterRule> rules = Arrays.asList(
                // at least one upper-case character
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                // at least one lower-case character
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                // at least one digit character
                new CharacterRule(EnglishCharacterData.Digit, 1),
                // at least one special character
                new CharacterRule(EnglishCharacterData.SpecialAscii, 1));
        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generatePassword(length, rules);
        return ResponseEntity.ok(password);
    }
}