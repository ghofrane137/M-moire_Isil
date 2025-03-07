package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Utilisateur;


import org.springframework.data.repository.CrudRepository;


import java.util.List;
import java.util.Optional;


public interface UtilisateurRepository extends CrudRepository<Utilisateur, Long> {


    long count();


    long countByRole(String role);


    long countByAdresse(String adresse);



    boolean existsByEmail(String email);


    boolean existsByTelephone(String telephone);



    void deleteByEmail(String email);


    void deleteByTelephone(String telephone);Optional<Utilisateur> findById(Long id);



    Optional<Utilisateur> findByNom(String nom);


    Optional<Utilisateur> findByEmail(String email);


    Optional<Utilisateur> findByPrenom(String prenom);


    Optional<Utilisateur> findByTelephone(String telephone);


    Optional<Utilisateur> findByNomContainingIgnoreCase(String nom);


    Optional<Utilisateur> findByEmailAndNom(String email, String nom);


    Optional<Utilisateur> findByNomAndPrenom(String nom, String prenom);


    Optional<Utilisateur> findByEmailContainingIgnoreCase(String email);


    Optional<Utilisateur> findByRoleAndAdresse(String role, String adresse);


    Optional<Utilisateur> findByEmailAndPrenom(String email, String prenom);


    Optional<Utilisateur> findByAdresseContainingIgnoreCase(String adresse);


    Optional<Utilisateur> findByEmailAndTelephone(String email, String telephone);


    Optional<Utilisateur> findByEmailAndNomAndPrenom(String email, String nom, String prenom);





}
