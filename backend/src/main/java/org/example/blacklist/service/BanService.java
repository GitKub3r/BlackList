package org.example.blacklist.service;

import org.example.blacklist.entities.Ban;
import org.example.blacklist.repo.BanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
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

    public HttpStatus addBan(Ban newBan) {
        Integer currentBanCount = banRepository.countByUserId(newBan.getUserId());

        if (currentBanCount >= 10) {
            return HttpStatus.BAD_REQUEST;
        }

        try {
            banRepository.save(newBan);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.CONFLICT;
        }
    }

    public void deleteBan(Ban ban) {
        banRepository.deleteByUserIdAndChampionId(ban.getUserId(), ban.getChampionId());
    }
}
