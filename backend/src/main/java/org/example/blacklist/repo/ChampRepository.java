package org.example.blacklist.repo;

import org.example.blacklist.entities.Champion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChampRepository extends JpaRepository<Champion, Integer> {
    public Champion findByName(String name);
    public List<Champion> findByIdIn(List<Integer> ids);
}
