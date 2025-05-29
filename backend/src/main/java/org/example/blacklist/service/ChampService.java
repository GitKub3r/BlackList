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

    public Champion addChampionAndReturn(String name) {
        // Comprueba si ya existe un campeón con ese nombre (ajusta según tu lógica)
        Champion existing = champRepository.findByName(name);
        if (existing != null) {
            return null; // Ya existe, no lo añade
        }
        Champion champion = new Champion();
        champion.setName(name);
        // ...setea otros campos si es necesario...
        return champRepository.save(champion);
    }

    public void deleteChampion(Integer id) {
        Champion champ = champRepository.findById(id).get();

        if (champ != null) {
            champRepository.delete(champ);
        }
    }
}
