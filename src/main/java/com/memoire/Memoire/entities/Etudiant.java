package com.memoire.Memoire.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import jakarta.persistence.OneToMany;
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
        ()
public class Etudiant extends Utilisateur {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "etudiant")
    private List<Bibliotheque> bibliothequeList;
}


