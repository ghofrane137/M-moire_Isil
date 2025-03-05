package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Utilisateur;


import org.springframework.data.repository.CrudRepository;


import java.util.Optional;


public interface UtilisateurRepository extends CrudRepository<Utilisateur, Long> {



    Optional<Utilisateur> findById(Long id);


    Optional<Utilisateur> findByNom(String nom);


    Optional<Utilisateur> findByEmail(String email);


    Optional<Utilisateur> findByPrenom(String prenom);


    Optional<Utilisateur> findByTelephone(String telephone);


    Optional<Utilisateur> findByEmailAndNom(String email, String nom);


    Optional<Utilisateur> findByNomAndPrenom(String nom, String prenom);


    Optional<Utilisateur> findByEmailAndPrenom(String email, String prenom);


    Optional<Utilisateur> findByEmailAndTelephone(String email, String telephone);


    Optional<Utilisateur> findByEmailAndNomAndPrenom(String email, String nom, String prenom);

}
