package org.example.blacklist.service;

import org.example.blacklist.entities.Champion;
import org.example.blacklist.repo.ChampRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampService {
    private ChampRepository champRepository;

    public ChampService(ChampRepository champRepository) {
        this.champRepository = champRepository;
    }

    public List<Champion> getAllChampions() {
        return champRepository.findAll();
    }

    public Champion getChampionById(Integer id) {
        return champRepository.findById(id).get();
    }

    public List<Champion> getChampionsById(List<Integer> ids) {
        return champRepository.findByIdIn(ids);
    }

    public Champion getChampionByName(String championName) {
        return champRepository.findByName(championName);
    }

    public HttpStatus addChampion(String champion) {
        Champion champ = new Champion();
        champ.setName(champion);

        try {
            champRepository.save(champ);
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }

        return HttpStatus.OK;
    }

    public void deleteChampion(Integer id) {
        Champion champ = champRepository.findById(id).get();

        if (champ != null) {
            champRepository.delete(champ);
        }
    }
}
