package org.example.blacklist.repo;

import org.example.blacklist.entities.Champion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChampRepository extends JpaRepository<Champion, Integer> {
}
