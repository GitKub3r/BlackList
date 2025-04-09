package org.example.blacklist.service;

import org.example.blacklist.entities.Ban;
import org.example.blacklist.repo.BanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BanService {

    BanRepository banRepository;

    public BanService(BanRepository banRepository) {
        this.banRepository = banRepository;
    }

    public List<Ban> getAllBans() {
        return banRepository.findAll();
    }

    public List<Ban> getBanByUserId(Integer userId) {
        return banRepository.findByUserId(userId);
    }

    public void addBan(Ban newBan) {
        Integer currentBanCount = banRepository.countByUserId(newBan.getUserId());

        if (currentBanCount >= 10) {
            throw new IllegalArgumentException("User exceeded 10 bans limit");
        }

        banRepository.save(newBan);
    }

    public void deleteBan(Ban ban) {
        banRepository.deleteByUserIdAndChampionId(ban.getUserId(), ban.getChampionId());
    }
}
