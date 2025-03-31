package org.example.blacklist.controller;

import org.example.blacklist.entities.Player;
import org.example.blacklist.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping
    public ResponseEntity<?> getAllPlayers() {
        List<Player> players = playerService.findAll();

        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(players);
    }
}
