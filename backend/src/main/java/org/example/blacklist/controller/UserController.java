package org.example.blacklist.controller;

import org.example.blacklist.entities.User;
import org.example.blacklist.model.UserCreate;
import org.example.blacklist.model.UserDTO;
import org.example.blacklist.model.UserModify;
import org.example.blacklist.model.UserUpdate;
import org.example.blacklist.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        String token = userService.checkLogin(user.getUsername(), user.getPassword());

        if (token == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCreate user) {
        User dbUser = new User();
        dbUser.setUsername(user.getUsername());
        dbUser.setPassword(user.getPassword());
        dbUser.setEmail(user.getEmail());
        dbUser.setType(user.getType());

        userService.addUser(dbUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserUpdate user) {
        User dbUser = userService.getUserById(user.getId());

        if (dbUser == null) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean shareData = Objects.equals(user.getUsername(), dbUser.getUsername()) &&
                            Objects.equals(user.getPassword(), dbUser.getPassword()) &&
                            Objects.equals(user.getEmail(), dbUser.getEmail());

        if (shareData) {
            return ResponseEntity.noContent().build();
        } else {
            dbUser.setUsername(user.getUsername());
            dbUser.setPassword(user.getPassword());
            dbUser.setEmail(user.getEmail());

            userService.updateUser(dbUser);
            return ResponseEntity.ok().build();
        }
    }

    @PutMapping("/modify")
    public ResponseEntity<?> modifyUser(@RequestBody UserModify user) {
        User dbUser = new User();
        dbUser.setId(user.getId());
        dbUser.setUsername(user.getUsername());
        dbUser.setPassword(user.getPassword());
        dbUser.setEmail(user.getEmail());
        dbUser.setType(user.getType());
        userService.updateUser(dbUser);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);

        return ResponseEntity.ok().build();
    }
}
