package org.example.blacklist.controller;

import org.example.blacklist.entities.Ban;
import org.example.blacklist.entities.Champion;
import org.example.blacklist.model.BanDTO;
import org.example.blacklist.service.BanService;
import org.example.blacklist.service.ChampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bans")
public class BanController {
    @Autowired
    private BanService banService;
    @Autowired
    private ChampService champService;

    @GetMapping("/{userID}")
    public ResponseEntity<?> findAllByUserID(@PathVariable int userID) {
        List<Ban> bans = banService.getBanByUserId(userID);

        return ResponseEntity.ok(bans);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody BanDTO ban) {
        Ban dbBan = new Ban();
        Champion champion = champService.getChampionByName(ban.getChampionName());

        if (champion == null) {
            return ResponseEntity.notFound().build();
        }

        dbBan.setChampionId(champion.getId());
        dbBan.setUserId(ban.getUserID());

        try {
            banService.addBan(dbBan);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException ex) {
            // Usuario ya tiene 10 bans
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            // Cualquier otro error inesperado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado al agregar ban.");
        }
    }


    @DeleteMapping
    public ResponseEntity<?> delete(@RequestBody BanDTO ban) {
        Ban dbBan = new Ban();
        Champion champion = champService.getChampionByName(ban.getChampionName());

        if (champion == null) {
            return ResponseEntity.notFound().build();
        }

        dbBan.setChampionId(champion.getId());
        dbBan.setUserId(ban.getUserID());

        banService.deleteBan(dbBan);
        return ResponseEntity.ok().build();
    }
}
