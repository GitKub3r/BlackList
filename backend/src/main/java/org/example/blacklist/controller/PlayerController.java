package org.example.blacklist.controller;

import org.example.blacklist.entities.Player;
import org.example.blacklist.entities.User;
import org.example.blacklist.model.PlayerDTO;
import org.example.blacklist.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping
    public ResponseEntity<?> getAllPlayers() {
        List<Player> players = playerService.findAll();
        return ResponseEntity.ok(players);
    }

    @PostMapping
    public ResponseEntity<?> createPlayer(@RequestBody PlayerDTO dto) {
        try {
            Player saved = playerService.createPlayerFromDTO(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable Integer id) {
        try {
            playerService.deletePlayer(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\":\"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/clean-expired")
    public ResponseEntity<?> cleanExpiredPlayers() {
        int deleted = playerService.cleanExpiredPlayers();
        return ResponseEntity.ok("{\"deleted\":" + deleted + "}");
    }
}
