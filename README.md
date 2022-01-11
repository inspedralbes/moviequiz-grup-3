# Movie Quiz 3

## Integrants
- Albert Chao
- Eric Clemente
- Arnau Orts

## Descripció
Aquest és el segon projecte transversal de 2n DAW. Fem una pàgina web en format *Single Page Application* (SPA).

Utilitzem una base de dades en *mysql* al labs, en la qual tenim tota la informació d'usuaris, pel·lícules, els feedbacks que afegeixen els usuaris i els jocs.

## Esquema de carpetes
- /seguiment: conté les actes

- /server

    Té els arxius de la connexió amb la base de dades.

    - /Managers: on estan tots els arxius de control, amb les funcions que executen els comandos a la base de dades.

    - /sql: conté l'arxiu de creació de la base de dades amb els inserts.

- /web

    És l'arrel de la web, on està l'index.html i el basic.css.

    - /img: on estan totes les imatges necessàries de la web **(les de les pel·lícules no)**

    - /js: on es troben tots els arxius javascript que es criden desde l'index.html.

    - /php_files: tots els arxius als quals els js fan fetch, per a que es posin en contacte amb el manager pertinent del servidor.

## Estat actual
- Login i registre (**funcionant**, falta UX en login)
- Cercador de pel·lícules (**funcionant**)
- Afegir i treure de favorits (**funcionant**, falta UX)
- Joc (**funcionant**, només un nou joc)

### Links
- [Web Movie Quiz](http://moviequiz3.alumnes.inspedralbes.cat)
- [GitHub](https://github.com/inspedralbes/moviequiz-grup-3)

# **Informació important**
Hi ha 2 usuaris creats per defecte.
|      usuari      | contrasenya |
|------------------|-------------|
| pedralbes@gmail.com | pedralbes |
| ausias@gmail.com | ausias1 |