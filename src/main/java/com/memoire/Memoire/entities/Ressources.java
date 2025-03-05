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


public class Ressources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String titre;


    private String description;


    private String url;


    private int semestre;


    private String niveau;


    @OneToMany(mappedBy = "ressource", cascade = CascadeType.ALL)
    private List<Historique> historiques;


    @Enumerated(EnumType.STRING)
    private StatutRessource statut;


    public enum StatutRessource {
        EN_ATTENTE,
        PUBLIC,
        PRIVE,
        REJETEE;
    }
}