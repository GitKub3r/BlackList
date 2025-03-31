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

    @PostMapping("/{name}")
    public ResponseEntity<?> addChampion(@PathVariable String name) {
        HttpStatus status = champService.addChampion(name);
        return ResponseEntity.status(status).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChampion(@PathVariable Integer id) {
        champService.deleteChampion(id);
        return ResponseEntity.ok().build();
    }
}
