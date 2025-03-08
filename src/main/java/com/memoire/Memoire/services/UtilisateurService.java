package com.memoire.Memoire.services;


import com.memoire.Memoire.entities.Utilisateur;


import com.memoire.Memoire.repositories.UtilisateurRepository;


import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;


import java.util.List;


import java.util.Optional;


@Service


public class UtilisateurService {


    private final UtilisateurRepository utilisateurRepository;


    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }


    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }


    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }


    public Optional<Utilisateur> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }



    public Optional<Utilisateur> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findAllByEmail(email);
    }


    public Optional<Utilisateur> getUtilisateurByTelephone(String telephone) {
        return utilisateurRepository.findAllByTelephone(telephone);
    }


    public Utilisateur updateUtilisateur(Long id, Utilisateur updatedUtilisateur) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {
                    utilisateur.setNom(updatedUtilisateur.getNom());
                    utilisateur.setPrenom(updatedUtilisateur.getPrenom());
                    utilisateur.setEmail(updatedUtilisateur.getEmail());
                    utilisateur.setTelephone(updatedUtilisateur.getTelephone());
                    utilisateur.setRole(updatedUtilisateur.getRole());
                    utilisateur.setAdresse(updatedUtilisateur.getAdresse());
                    return utilisateurRepository.save(utilisateur);
                })
                .orElseThrow(() -> new RuntimeException("Utilisateur not found with id: " + id));
    }


    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }


    public Long countAllUtilisateurs() {
        return utilisateurRepository.count();
    }


    public Long countUtilisateursByRole(String role) {
        return utilisateurRepository.countByRole(role);
    }


    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }


    public boolean existsByTelephone(String telephone) {
        return utilisateurRepository.existsByTelephone(telephone);
    }


    public Optional<Utilisateur> findUtilisateursByRole(String role) {
        return utilisateurRepository.findAllByRole(role);
    }

    public Optional<Utilisateur> findUtilisateursByAdresse(String adresse) {
        return utilisateurRepository.findAllByAdresse(adresse);
    }

    public Optional<Utilisateur> findUtilisateursByRoleAndAdresse(String role, String adresse) {
        return utilisateurRepository.findAllByRoleAndAdresse(role, adresse);
    }
}