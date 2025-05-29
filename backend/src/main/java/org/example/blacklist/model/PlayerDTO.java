package org.example.blacklist.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PlayerDTO {
    public String username;
    public String tag;
    public String description;
    public LocalDate duration;
    public Boolean permanent;
    public String hosterUsername;
}
