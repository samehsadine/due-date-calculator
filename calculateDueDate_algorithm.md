## Algorithme simple - dueDateCalculator

### Objectif : ajouter un nombre d'heures de travail( hures ouvrés) à une date de soumission.

### Étapes principales:
1. Vérification des entrès.
     - Si workHours < 0  --> erreur
     - Si la date submit n'est pas un jour ouvré(lundi à vendredi) --> .erreur

2. Initialisation
    - Convertir worksHours en mnutes(remainingMinutes).
    - Copir la date de soumission (currentDate).
    - Si remainingMinutes = 0 --> retournr currentDate directement

3. Boucle(tanqu'il rest des minutes à travailler)
   
    1. Si currentDate n'est pas dans une plage ouvrée(soir, nuit, weekeend) --> avancer à prochain jour ouvré 09:00.
    2. Calculer combien de minutes on peut travailler ce jour-là
       
        - canWork = Math.min(minutesRemainingInDay(currentDate), remainingMinutes)
    3. Avancer l'horloge de canWork minutes et réduire remainingMinutes.
    4. Si on tombe exactement sur 17:00 avc temp restan --> avancer au lendemain 09:00 ou lundi si weekend.

4. Résultat 
   - Quand toutes les minuts sont consommées, retourner currentDate

