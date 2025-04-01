package org.example.blacklist.model;

import lombok.Data;

@Data
public class UserCreate {
    private String username;
    private String email;
    private String password;
    private String type;
}
