package org.example.blacklist.service;

import org.example.blacklist.config.JWTUtil;
import org.example.blacklist.entities.User;
import org.example.blacklist.model.UserCreate;
import org.example.blacklist.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    public UserService(UserRepository userRepository, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public String checkLogin(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return jwtUtil.generateToken(user.getId());
        }

        return null;
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        Optional<User> checkUser = userRepository.findById(user.getId());

        if (checkUser.isPresent()) {
            user.setUsername(user.getUsername());
            user.setEmail(user.getEmail());
            user.setPassword(user.getPassword());

            userRepository.save(user);
        }
    }

    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            userRepository.delete(user);
        }
    }
}
