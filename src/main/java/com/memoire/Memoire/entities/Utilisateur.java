package com.memoire.Memoire.entities;


import jakarta.persistence.*;


import lombok.AllArgsConstructor;


import lombok.Getter;


import lombok.NoArgsConstructor;


import lombok.Setter;

import java.util.List;


@Entity


@Getter


@Setter


@NoArgsConstructor


@AllArgsConstructor


public class Utilisateur{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "Name")
    private String nom;


    private String prenom;


    private String email;


    private String adresse;


    private String motDePasse;


    private String telephone;


    private String role;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "utilisateur")
    private List<Historique> historiques;


}
