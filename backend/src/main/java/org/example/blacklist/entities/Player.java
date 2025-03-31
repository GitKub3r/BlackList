package org.example.blacklist.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "tag", nullable = false, length = 50)
    private String tag;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private LocalDate duration;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "hoster", nullable = false, referencedColumnName = "username")
    private User hoster;

    @Column(name = "PERMANENT")
    private Boolean permanent;

    public Boolean getPermanent() {
        return permanent;
    }

    public void setPermanent(Boolean permanent) {
        this.permanent = permanent;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDuration() {
        return duration;
    }

    public void setDuration(LocalDate duration) {
        this.duration = duration;
    }

    public User getHoster() {
        return hoster;
    }

    public void setHoster(User hoster) {
        this.hoster = hoster;
    }

}