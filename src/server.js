const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  try {
    const formData = req.body;

    // Provera da li korisnik već postoji
    const existingUsers = getUsers();
    const isUserExists = existingUsers.some(user => user.username === formData.username);

    if (isUserExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Dodavanje novog korisnika
    existingUsers.push(formData);
    saveUsers(existingUsers);

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Funkcija za čitanje korisnika iz datoteke
function getUsers() {
  try {
    const data = fs.readFileSync('podaci.JSON', 'utf-8');
    return JSON.parse(data).users;
  } catch (error) {
    return [];
  }
}

// Funkcija za čuvanje korisnika u datoteci
function saveUsers(users) {
  const data = { users };
  fs.writeFileSync('podaci.JSON', JSON.stringify(data, null, 2), 'utf-8');
}
