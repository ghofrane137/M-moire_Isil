package com.memoire.Memoire.entities;


import jakarta.persistence.Entity;


import jakarta.persistence.GeneratedValue;


import jakarta.persistence.GenerationType;


import jakarta.persistence.Id;


import lombok.AllArgsConstructor;
import lombok.Getter;


import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity


@Getter


@Setter


@AllArgsConstructor


@NoArgsConstructor


public class Commentaire {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
