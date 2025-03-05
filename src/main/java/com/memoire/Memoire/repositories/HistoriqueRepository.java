package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Historique;


import com.memoire.Memoire.entities.Ressources;


import com.memoire.Memoire.entities.Utilisateur;


import org.springframework.data.repository.CrudRepository;



import java.util.Date;


import java.util.Optional;


public interface HistoriqueRepository extends CrudRepository<Historique, Long> {


    Optional<Historique> findById(Long id);


    Optional<Historique> findByDateConsultation(Date DateConsultation);


    Optional<Historique> findByRessource(Ressources ressource);


    Optional<Historique> findByUtilisateur(Utilisateur utilisateur);


    Optional<Historique> findByRessourceAndDateConsultation(Ressources ressource, Date DateConsultation);


    Optional<Historique> findByUtilisateurAndDateConsultation(Utilisateur utilisateur, Date DateConsultation);


    Optional<Historique> findByUtilisateurAndRessourceAndDateConsultation(Utilisateur utilisateur, Ressources ressource, Date date);



}
