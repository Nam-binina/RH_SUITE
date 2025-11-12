# entreprise_Spring
    ## Frontend
        A-Partie RH
        1-Une page liste des employer
            -Fonction filtre,rechercher
            -Avec un boutton pour voir la fiche personnel de chaque employer
        2-Fiche personnel
            -Affichage du nom,prenom,numero,address,photo,date embauche et date de fin de contrat,departement et son manager
        3-Un page de calendrier de suivie des absence et conge
            -Une input date
            -Un select des employer ou datalist des employer
            -un calendrier permetant de visualiser le conge et absence des employer
        4-Une page de liste des demande de conge
            -Une liste des congee en attente
            -Bouton de validation pour valider le conger
        5-Une page configuration
            -select (cnaps,ostie,irsa)
            -une input taux
            -un bouton submit pour modifer les taux
        B-Partie employer
        1-Pointage de presence
            -Une input date pour le jour du pointage
            -Une input time pour l'heure d'entree
            -Une input time pour l'heure de sortie
            -Une input time pour le debut des pause
            -Une input time pour la fin des pauses
            -Un bouton submit
        2-Une page relever de presence
            -Une input date pour obtenir la date necessaire du pointage
            -Un bouton submit
            -Type de retour pdf du pointage
        3-Fiche de paye mensuelle
            -Un tableau ressemblant a la fiche_de_paie.xlsx
            -Un bouton exporter en xlsx si necessaire
    ## Backend
        1-Une fonction getEmployers()
            Type de retours: List<Employer>
        2-Une fonction getEmployerById(int id)
            Type de retours: Employer
        3-Une fonction getDemandeConge(Statut s)
            -s = VALIDE
            -Type de retour : List<DemandeConge,Employer e>
        4-Une fonction getAbsence(Employer e,Date d)
            -Extraction du mois et annees
            -Utilisation de la table historique absence
            -Type de retour : List<Absence>
        5-Fonction createConge(Employer e,TypeConge c,Date debut,Date fin,String motif)
            -Verification des donne
            -creation de variable nbr de jours = fin - debut
            -Insertion dans demande conge
            Type de retours: List<DemandeConge>
        6-Une fonction getCongeEnAttente(Status s)
            -s = EN ATTENTE
            Type de retours: List<DemandeConge>
        7-Une fonction validateDemande(DemandeConge d)
            -update du statut en VALIDE
            -date_validation = NOW
            -Insertion dans demande conge
        8-Une fonction update_taux(String type,Double taux)
            -Verification si type appartient a (cnaps,ostie,irsa)
            -update des taux selon le type dans les employer
        9-pointage(Pointage p)
            -calcul des heures de travail : entree - sortie -(debut_pause-fin_pause)
            -calcul si le retard se passe durant 5 min apres l'entree 
                -si oui l'employer ne seras pas en retard
            -calcul des heures sup si present 
            -Insertion dans pointage
        10-Une fonction getReleveByDate(Date d)
            -extraction du moi et annee
            -Recherche dans releve_presence selon mois et annee
            -retour
        11-ConvertReleveToPdf(releve_presence)
            -Conversion du releve en pdf
        12-GetFichePaie(Employer e,Date d)
            -extraction du moi et annee
            -Recherche dans fiche paie selon employer, mois et annee 
            -retour en fichier xlsx