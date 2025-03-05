package com.memoire.Memoire.repositories;


import com.memoire.Memoire.entities.Bibliotheque;


import com.memoire.Memoire.entities.Etudiant;


import org.springframework.data.repository.CrudRepository;


import java.util.Optional;


public interface BibliothequeRepository extends CrudRepository<Bibliotheque, Long> {


     Optional<Bibliotheque> findById(Long id);


     Optional<Bibliotheque> findByTitre(String titre);


     Optional<Bibliotheque> findByEtudiant(Etudiant etudiant);


     Optional<Bibliotheque> findByDescription(String description);


     Optional<Bibliotheque> findByEtudiantAndTitre(Etudiant etudiant, String titre);


     Optional<Bibliotheque> findByTitreAndDescription(String titre, String description);


}
