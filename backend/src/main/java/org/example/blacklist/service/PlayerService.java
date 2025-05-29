package org.example.blacklist.service;

import org.example.blacklist.entities.Player;
import org.example.blacklist.entities.User;
import org.example.blacklist.model.PlayerDTO;
import org.example.blacklist.repo.PlayerRepository;
import org.example.blacklist.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final UserService userService;

    @Autowired
    public PlayerService(PlayerRepository playerRepository, UserService userService) {
        this.playerRepository = playerRepository;
        this.userService = userService;
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    public Player createPlayerFromDTO(PlayerDTO dto) {
        Player player = new Player();
        player.setUsername(dto.username);
        player.setTag(dto.tag);
        player.setDescription(dto.description);
        player.setDuration(dto.permanent != null && dto.permanent ? null : dto.duration);
        player.setPermanent(dto.permanent);

        User hoster = userService.getUserByUsername(dto.hosterUsername);
        if (hoster == null) {
            throw new IllegalArgumentException("Hoster not found");
        }
        player.setHoster(hoster);

        return playerRepository.save(player);
    }

    public void deletePlayer(Integer id) {
        playerRepository.deleteById(id);
    }

    public int cleanExpiredPlayers() {
        LocalDate today = LocalDate.now();
        List<Player> toDelete = playerRepository.findAll().stream()
                .filter(p -> !Boolean.TRUE.equals(p.getPermanent()))
                .filter(p -> p.getDuration() == null || p.getDuration().isBefore(today))
                .collect(Collectors.toList());
        int deleted = toDelete.size();
        toDelete.forEach(p -> playerRepository.deleteById(p.getId()));
        return deleted;
    }
}
