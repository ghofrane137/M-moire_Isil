package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Ressources;


import org.springframework.data.repository.CrudRepository;


import java.util.List;
import java.util.Optional;


public interface RessourcesRepository extends CrudRepository<Ressources,Long> {


    List<Ressources> findAll();


    Optional<Ressources> findById(Long id);


    Optional<Ressources> findByUrl(String url);


    Optional<Ressources> findByTitre(String titre);


    Optional<Ressources> findByNiveau(String niveau);


    Optional<Ressources> findBySemestre(int semestre);


    Optional<Ressources> findByTitreAndUrl(String titre, String url);


    Optional<Ressources> findByStatut(Ressources.StatutRessource statut);


    Optional<Ressources> findByTitreAndSemestre(String titre, int semestre);


    Optional<Ressources> findByNiveauAndSemestre(String niveau, int semestre);


    Optional<Ressources> findByTitreAndStatut(Ressources.StatutRessource statut, String titre);


    Optional<Ressources> findByTitreAndNiveauAndSemestre(String titre, String niveau, int semestre);



    Optional<Ressources> findByTitreAndSemestreAndNiveau(String titre, int semestre, String niveau);











}
