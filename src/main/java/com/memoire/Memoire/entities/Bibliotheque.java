package com.memoire.Memoire.entities;


import jakarta.persistence.*;


import lombok.AllArgsConstructor;


import lombok.Getter;


import lombok.NoArgsConstructor;


import lombok.Setter;


@Entity


@Getter


@Setter


@NoArgsConstructor


@AllArgsConstructor


public class Bibliotheque {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long   id;


    private String titre;


    private String description;


    @ManyToOne
    private Etudiant etudiant;

}
