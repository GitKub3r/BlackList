package org.example.blacklist.repo;

import org.example.blacklist.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
