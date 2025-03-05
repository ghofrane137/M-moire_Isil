package com.memoire.Memoire.entities;


import jakarta.persistence.*;


import lombok.AllArgsConstructor;


import lombok.Getter;


import lombok.NoArgsConstructor;


import lombok.Setter;


import java.util.Date;


@Entity


@Getter


@Setter


@NoArgsConstructor


@AllArgsConstructor


public class Historique {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Date dateConsultation;


    @ManyToOne
    private Utilisateur utilisateur;


    @ManyToOne
    private Ressources ressource;
}
