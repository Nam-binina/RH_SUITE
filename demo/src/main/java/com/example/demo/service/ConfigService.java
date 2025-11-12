package com.example.demo.service;

import java.math.BigDecimal;

public interface ConfigService {
    /**
     * Met à jour le taux global pour le type (cnaps|ostie|irsa) sur tous les
     * employés.
     * 
     * @param type 'cnaps'|'ostie'|'irsa'
     * @param taux valeur (ex 0.01)
     * @return le nombre d'employés mis à jour
     */
    int updateTaux(String type, BigDecimal taux);
}
