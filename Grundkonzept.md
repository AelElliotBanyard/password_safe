# Grundkonzept

## Ziel und Zweck
Das Ziel dieser Applikation ist, dass der Benutzer seine Passwörter an einem sicheren Ort ablegen kann.
Dabei soll er die Möglichkeit haben, seine Passwörter in Kategorien einzuteilen und diese zu verwalten.
Die Applikation soll auf einem Server laufen, sodass der Benutzer von überall auf seine Passwörter zugreifen kann.
Die Applikation soll außerdem so sicher wie möglich sein, sodass die Passwörter nicht in falsche Hände geraten können.
Der Zweck dieser Applikation ist, dass der Benutzer seine Passwörter nicht mehr auf einem Zettel oder in einem ungesicherten Dokument speichern muss.
Außerdem soll der Benutzer seine Passwörter nicht mehr auswendig lernen müssen.

## Funktionen & Features
- Anmeldung
- Registrierung
- Passwort ändern
- Passwort zurücksetzen
- Login hinzufügen
- Login bearbeiten
- Login löschen
- Kategorie hinzufügen
- Kategorie bearbeiten
- Kategorie löschen
- Passwort generieren
- Passwort kopieren
- Passwort löschen
- Passwort anzeigen
- Passwort verstecken
- Passwort bearbeiten
- Passwort suchen
- Passwort sortieren
- Passwort filtern


## Technische Rahmenbedingungen

### Frontend
React

### Backend
Spring Boot

### Datenbank
PostgreSQL

### Deployment
Docker auf banyard.tech

## Sicherheitskonzept

### Authentifizierung
Die Authentifizierung erfolgt über ein JWT-Token, welches bei der Anmeldung an den Client gesendet wird. Dieses Token wird bei jeder Anfrage an den Server mitgesendet und vom Server überprüft. Das Token wird nach 5 Minuten ungültig und muss erneuert werden.

### Injections
Um Injections zu verhindern, werden alle Anfragen an den Server über Prepared Statements ausgeführt.

### XSS
Um XSS zu verhindern, werden alle Eingaben vom Client vor dem Senden an den Server überprüft. Außerdem werden alle Eingaben vom Server vor dem Senden an den Client überprüft.

### Cryptographic Failures
Um Cryptographic Failures zu verhindern, werden alle Passwörter mit einem Salt versehen und gehasht. Außerdem werden alle Passwörter mit mindestens 8 Zeichen Länge erzwungen.

### Insecure Design
Um Insecure Design zu verhindern, werden alle Passwörter mit mindestens 8 Zeichen Länge erzwungen.

### Identification and Authentication Failures
Um Identification and Authentication Failures zu verhindern, werden alle Passwörter mit mindestens 8 Zeichen Länge erzwungen.

