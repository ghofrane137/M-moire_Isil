package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Utilisateur;


import org.springframework.data.repository.CrudRepository;


import org.springframework.stereotype.Repository;


import java.util.List;


import java.util.Optional;


@Repository


public interface UtilisateurRepository extends CrudRepository<Utilisateur, Long> {


    long count();


    long countByRole(String role);


    long countByAdresse(String adresse);



    boolean existsByEmail(String email);


    boolean existsByTelephone(String telephone);



    void deleteByEmail(String email);


    void deleteByTelephone(String telephone);



    List<Utilisateur> findAll();


    Optional<Utilisateur> findById(Long id);


    Optional<Utilisateur> findAllByNom(String nom);


    Optional<Utilisateur> findAllByRole(String role);


    Optional<Utilisateur> findAllByAdresse(String adresse);


    Optional<Utilisateur> findAllByEmail(String email);


    Optional<Utilisateur> findAllByPrenom(String prenom);


    Optional<Utilisateur> findAllByTelephone(String telephone);


    Optional<Utilisateur> findAllByNomContainingIgnoreCase(String nom);


    Optional<Utilisateur> findAllByEmailAndNom(String email, String nom);


    Optional<Utilisateur> findAllByNomAndPrenom(String nom, String prenom);


    Optional<Utilisateur> findAllByEmailContainingIgnoreCase(String email);


    Optional<Utilisateur> findAllByRoleAndAdresse(String role, String adresse);


    Optional<Utilisateur> findAllByEmailAndPrenom(String email, String prenom);


    Optional<Utilisateur> findAllByAdresseContainingIgnoreCase(String adresse);


    Optional<Utilisateur> findAllByEmailAndTelephone(String email, String telephone);


    Optional<Utilisateur> findAllByEmailAndNomAndPrenom(String email, String nom, String prenom);
}