# Amazon Clone PL

Projekt stworzony w HTML, CSS, JavaScript i Node.js, inspirowany wyglądem Amazona.  
Bazuje na szablonie HTML/CSS/JavaScript autorstwa **SuperSimpleDev**.

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
- SuperSimpleDev - autor oryginalnego szablonu


## Licencja
Projekt udostępniony na licencji ISC.


## instalacja i uruchamianie

```bash
## pobiera się odrazu w folderze. Tam gdzie się znajdujemy tworzymy folder z plikami amazon-clone
git clone http://github.com/6scars/amazon-clone.git

```
