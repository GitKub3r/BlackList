package org.example.blacklist.model;

import lombok.Data;

@Data
public class UserUpdate {
    private int id;
    private String username;
    private String email;
    private String password;
}
