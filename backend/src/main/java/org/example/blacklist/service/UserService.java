package org.example.blacklist.service;

import org.example.blacklist.config.JWTUtil;
import org.example.blacklist.entities.User;
import org.example.blacklist.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;

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

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String checkLogin(String username, String password) {
        User user = userRepository.findByUsername(username);

        // Compara usando BCrypt
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return jwtUtil.generateToken(user.getId());
        }

        return null;
    }

    public void addUser(User user) {
        // Guarda la contraseña encriptada
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
    }

    public void updateUser(User user) {
        Optional<User> checkUser = userRepository.findById(user.getId());

        if (checkUser.isPresent()) {
            User existingUser = checkUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());

            String newPassword = user.getPassword();

            // Solo actualiza la contraseña si el usuario la ha cambiado (campo no vacío)
            if (newPassword != null && !newPassword.isEmpty()) {
                // Si la contraseña recibida NO es igual al hash guardado, la ciframos
                // Si el usuario mete la misma contraseña en texto plano, la ciframos igualmente (no pasa nada)
                existingUser.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
            }
            // Si el campo está vacío, no la cambiamos

            userRepository.save(existingUser);
        }
    }

    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            userRepository.delete(user);
        }
    }
}