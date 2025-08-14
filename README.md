# Amazon Clone PL

Projekt stworzony w HTML, CSS, JavaScript i Node.js, inspirowany wyglądem Amazona.  
Bazuje na szablonie HTML/CSS/JavaScript autorstwa **SuperSimpleDev** .

**Uwaga:** Projekt nie przyjmuje płatności i nie wysyła prawdziwych produktów.  
Ma charakter wyłącznie edukacyjny.

---

## Opis

Projekt (aplikacja e-commerce) miał w głównej mierze poszerzyć moją wiedzę z zakresu JavaScript.  
Podczas pracy rozwinąłem również umiejętności w obszarach:
- baz danych nierelacyjnych (*MongoDB*),
- konfiguracji środowiska *Node.js*,
- korzystania z bibliotek w *Node.js*.

Celem było stworzenie aplikacji, w której użytkownik może:
- założyć konto,
- zalogować się,
- „zamówić” produkt,  
a cały proces przebiega tak, jak w prawdziwych sklepach internetowych (np. apple.com czy temu.com).

---

## Funkcjonalności

- **MPA (Multi Page Application)** — każda podstrona ma osobny plik HTML.
- **Rejestracja** — walidacja po stronie klienta i serwera, zapis danych w *MongoDB*.
- **Logowanie** — walidacja e-maila i hasła przy użyciu biblioteki **bcrypt**, wysyłanie do użytkownika klucza **JSON Web Token**.
- **Koszyk** — możliwość dodania produktów zarówno zalogowanym, jak i niezalogowanym użytkownikom.
- **Formularz wysyłki/adresowy** — dane zapisywane w *MongoDB* (dla zalogowanych) lub w *localStorage* (dla niezalogowanych).

---

## Technologie

- HTML
- CSS
- JavaScript
- Node.js

---

## Zależności (package.json)

```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dayjs": "^1.11.13",
    "dotenv": "^17.2.0",
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "module": "^1.2.5",
    "mongodb": "^6.17.0",
    "mongoose": "^8.16.2",
    "morgan": "^1.10.0",
    "path": "^0.12.7",
    "resend": "^4.7.0"
  }
}
```

## Autorzy
- Marcin Michoń
- SuperSimpleDev [Link: https://www.youtube.com/c/SuperSimpleDev] - autor oryginalnego szablonu


## Licencja
Projekt udostępniony na licencji ISC.


## instalacja i uruchamianie

### Pobieranie plików

Otwieramy terminal: ctrl + shift + ` (jeśli pracujemy w aplikacji vs code (vistual studio code))
i wpisujemy:

```bash
## Pobiera się odrazu w folderze. Tam gdzie się znajdujemy tworzymy folder z plikami amazon-clone
git clone http://github.com/6scars/amazon-clone.git

## Wejdź do pliku amazon-clone/server i wpisz:
npm install     ## W tedy pobiorą sie wszystkie dependancies który mamy zapisane w package.json

```
### 1. Gdy mamy pobrane pakiety (dependancies) zajmiemy się bazą.
   Aby strona działała z bazą danych musimy podłączyć ją do serwera.
    - Wchodzimy na strone MongoDb, logujemy się / rejestrujemy
    - tworzymy nowy klaster( mój nazywa się Cluster0) M0 free Tier z Limitem 512MB.
        - wybierz region najbliższy twojej lokalizacji 
        - reszta default

- Gdy udało nam sie to zrobić przechodzimy do zakładki z lewej strony "SECURITY" -> "Database Access"
- Dodajemy nową role "ADD NEW DATA BASE USER" z prawej strony.
    - ustawiamy hasło
    - wybieramy w "Database User Privilages" -> "Build-in Role" -> "Read And write to any database"
    - klikamy "add User"




- Teraz trzeba dodać IP z którego będziemy się łączyć do bazy danych.
    
    ***Zazwyczaj jednak dodaje nasze zewnętrzne IP z automatu i nie trzeba ustawiać nowego, jednak dostawca internetu czasami zmienia nasze IP zewnętrzne co sprawia, że nie możemy połączyć się z bazą danych.***

    MongoDb wprowadziło zabezpieczenie, które pozwala łączyć się z klastrem tylko gdy zewnętrze IP od dostawcy internetu znajduje się na liście. Lub ustawimy w 0.0.0.0/0 do czego zachwile przejde...
    - przechodzimy do zakładki z lewej strony "SECURITY" -> "Network Access"
    - na górze z prawej strony mamy  przycisk "+ ADD IP ADDRESS". Wcięc wciskamy go.
    - w "Access List Entry" wpisujemy zewnętrzne ip z maską po znaku "/" , np. 41.222.111.100/32. 
    *jeśli niewiemy jakie mamy ip. możemy je sprawdzić na stronie https://www.whatismyip.com.
        Dodam, że możemy wpisać konkretne Ip, które pozwoli na łączenie się z każdego ip zewnętrznego, a mianowicie 0.0.0.0/0*

## 2. Tworzenie pliku env
- Tworzymi plik .env w folderze "server". Wpisujemy do niego :

```.env
JWT_SECRET=secretString
dbURL=mongodb+srv://<USER>:*<db_password>*@cluster0.zuu5zvg.mongodb.net/
resend_API_KEY=resend_API_KEY_string
PORT=3000
```

#### Jeżeli chcemy zapisywać dane do konkretnej bazy danych to zamiast użyć :
```env
dbURL=mongodb+srv://<USER>:<db_password>@cluster0.zuu5zvg.mongodb.net/
```

*Gdzie **USER** to nasza nazwa użytkownika, a raczej nazwa "Atlas Admin", **<db_password>** czyli hasło zaś do tego Atlas Admin'a*

#### wpisujemy:

```env
dbURL=mongodb+srv://<USER>:*<db_password>*@cluster0.cgq3qeb.mongodb.net/*<db_name>*?retryWrites=true&w=majority&appName=Cluster0
```
*gdzie **<db_password>** to hasło do użytkownika który tworzyliśmy w "ADD NEW DATA BASE USER", a **<db_name>** nazwa bazy danych, u mnie "AmazonDataBase",
"cluster0" i "Cluster0" też można zmienić jeśli inaczej sie nazywa*
    
#### Warto wpisać też: 
```bash
JWT_SECRET=secretString
PORT=3000 
```
*bez spacjii cudzysłowów. Będzie to konieczne jeśli chodzi o uruchomienie lokalnie serwera i  hashowanie hasła.(inaczej będą błędy w middleware'ach na serwerze).*


### 3. Prawie na końcu
Warto zainstalować narzędzie (tool), które ułatwia pracę z Node.js podczas developmentu. A Konkretnie restartuje server Node.js, gdy wykryje zmiany w plikach projektu.


- Zainstalujemy go globalnie, aby uzywać go w każdym projekcie:
```bash
npm install -g nodemon
```

- Jeśli nie chcemy w każdym projekcie, przechodzimy do amazon-clone/server i wspiujemy:
```bash
npm install --save-dev nodemon
```

- Trzeba też dodać produkty do bazy danych ponieważ na stronie nic się nie pojawi, a fetch'e do bazy danych zwrócą błędy:
```bash
npm run seed
```
 
 #

- Będąc w amozon-clone uruchamiamy serwer wpisując w terminal :ctrl + shift + ` (jeśli pracujemy w programie vs code)
```bash
    nodemon app.js
```

- lub 
```bash
    npm run dev
```

- Jeśli nie mamy zainstalowanego narzędzia nodemon, wpisujemy:
``` bash
    node app
```
 lub
``` bash
    npm run start
```

## Wchodzimy na przeglądarke

#### Wchodzimy w przeglądarke wpisujemy http://localhost:3000 i wyświetla sie strona, jeśli pojawia się komunikat: server is working on "PORT". znaczy że działa.



