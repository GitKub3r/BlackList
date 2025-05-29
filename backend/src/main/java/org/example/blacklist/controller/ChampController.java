package org.example.blacklist.controller;

import org.example.blacklist.entities.Champion;
import org.example.blacklist.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/champions")
public class ChampController {

    @Autowired
    private ChampService champService;

    @GetMapping
    public List<Champion> getAllChampions() {
        List<Champion> champions = champService.getAllChampions();
        return champions;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChampionById(@PathVariable Integer id) {
        Champion champion = champService.getChampionById(id);
        if (champion == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(champion);
    }

    @PostMapping("/{name}")
    public ResponseEntity<?> addChampion(@PathVariable String name) {
        Champion champion = champService.addChampionAndReturn(name);
        if (champion == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"Champion already exists\"}");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(champion);
    }

    @PostMapping("/filter")
    public ResponseEntity<?> filterChampions(@RequestBody List<Integer> ids) {
        List<Champion> champions = champService.getChampionsById(ids);

        return ResponseEntity.ok(champions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChampion(@PathVariable Integer id) {
        Champion champion = champService.getChampionById(id);
        if (champion == null) {
            return ResponseEntity.notFound().build();
        }
        champService.deleteChampion(id);
        return ResponseEntity.ok().build();
    }
}
