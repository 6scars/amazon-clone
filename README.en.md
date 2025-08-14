

# Amazon Clone

#### This project is built using HTML, CSS, JavaScript, and Node.js, inspired by the design of Amazon.  
It is based on an HTML/CSS/JavaScript template by **SuperSimpleDev**.

**Note:** This project does not process real payments or ship real products.  
It is intended purely for educational purposes.

---

## Description

The goal of this e-commerce application was primarily to expand my knowledge of JavaScript.  
During development, I also improved my skills in:

- Non-relational databases (*MongoDB*)
- Node.js environment setup
- Using Node.js libraries

The application allows users to:

- Create an account
- Log in
- "Order" products  

Simulating the full experience of real online stores (e.g., apple.com, temu.com).

---

## Features

- **MPA (Multi Page Application)** — each page has a separate HTML file
- **Registration** — client-side and server-side validation, data saved in MongoDB
- **Login** — email and password validation using **bcrypt**, sending a JSON Web Token to the user
- **Shopping Cart** — products can be added by both logged-in and guest users
- **Shipping/Address Form** — data saved in MongoDB (for logged-in users) or in *localStorage* (for guests)

---

## Technologies

- HTML
- CSS
- JavaScript
- Node.js

---

## Dependencies (`package.json`)

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

## Authors

- Marcin Michoń

- SuperSimpleDev [Link: https://www.youtube.com/c/SuperSimpleDev]– author of the original template

## License

This project is licensed under the ISC License.

# Installation and Running
## 1. Clone the repository

Open your terminal (in VS Code: Ctrl + Shift + ` ) and run:

### Clone the repository into a folder named amazon-clone
``` bash
    git clone http://github.com/6scars/amazon-clone.git
```

### Navigate to the server folder and install dependencies
``` bash
cd amazon-clone/server
npm install
```


## 2. Setup the Database

- Go to MongoDB and log in or create an account.

  - Create a new cluster (M0 Free Tier, 512MB limit).

  - Choose a region closest to your location.

  - Keep default settings for the rest.

- Add a new database user:

  - Go to SECURITY → Database Access → Add New Database User

  - Set a password

  - Choose Built-in Role → Read and write to any database

- Configure Network Access:

  - Go to SECURITY → Network Access → Add IP Address

  - Add your external IP with a mask, e.g., 41.222.111.100/32, or allow access from all IPs using 0.0.0.0/0

## 3. Create .env file

#### In the server folder, create a .env file:
```env
JWT_SECRET=secretString
dbURL=mongodb+srv://<USER>:<db_password>@cluster0.zuu5zvg.mongodb.net/
resend_API_KEY=resend_API_KEY_string
PORT=3000
```


**Replace:**

< USER > → MongoDB username

<db_password> → database user password

<db_name> → database name (e.g., AmazonDatabase)

## 4. Install nodemon (optional but recommended)

#### Nodemon automatically restarts the server when file changes are detected.

**Globally:**
```bash
npm install -g nodemon
```

Or locally in the project:
```bash
npm install --save-dev nodemon
```

**Seed the database with products:**
```bash
npm run seed
```

## 5. Run the server

**In the project root:**

#### Using nodemon
```bash
nodemon app.js
```
#### Or using npm script
```bash
npm run dev
```
---
#### If nodemon is not installed
```bash
node app.js
```
#### Or
```bash
npm run start
```


## 6. Open the application

Go to your browser and visit:

http://localhost:3000


If you see the message:

*Server is working on "PORT"*


the server is running successfully.


---

