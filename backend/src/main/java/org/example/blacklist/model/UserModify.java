package org.example.blacklist.model;

import lombok.Data;

@Data
public class UserModify {
    private int id;
    private String username;
    private String email;
    private String password;
    private String type;
}
