package org.example.blacklist.repo;

import jakarta.transaction.Transactional;
import org.example.blacklist.entities.Ban;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BanRepository extends JpaRepository<Ban, Integer> {
    public List<Ban> findByUserId(Integer userId);
    @Transactional
    public void deleteByUserIdAndChampionId(Integer userId, Integer championId);
    public Integer countByUserId(Integer userId);
}
