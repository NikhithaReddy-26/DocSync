package com.contiq.userservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="usr")
public class User {
    @Id
    @UuidGenerator
    @Column(name="usr_id")
    private String id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name="avatar_path")
    private String avatarUrl;
    @Column(name="created_on")
    private Date createdOn;
    @Column(name="updated_on")
    private Date updatedOn;
    @PrePersist
    protected void onCreate() {
        createdOn = new Date();
    }
    @PreUpdate
    protected void onUpdate() {
        updatedOn = new Date();
    }
}
