package com.unfiled6748.password_generator_manager.backend.mappers;

import com.unfiled6748.password_generator_manager.backend.dto.SignUpDto;
import com.unfiled6748.password_generator_manager.backend.dto.UserDto;
import com.unfiled6748.password_generator_manager.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto userDto);
}
