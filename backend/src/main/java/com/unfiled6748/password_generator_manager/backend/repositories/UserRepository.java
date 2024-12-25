package com.unfiled6748.password_generator_manager.backend.repositories;

import com.unfiled6748.password_generator_manager.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByUsername(String username);
}
