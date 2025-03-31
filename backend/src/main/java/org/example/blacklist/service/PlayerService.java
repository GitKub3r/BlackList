package org.example.blacklist.service;

import org.example.blacklist.entities.Player;
import org.example.blacklist.repo.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }
}
