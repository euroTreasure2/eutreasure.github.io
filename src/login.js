let jsSHA = require("jssha");

export const hash = (text) => {
  const hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
  hashObj.update(text);
  const hash = hashObj.getHash("HEX");
  return hash;
};

export const handleLogin = () => {
  const passwordInput = document.getElementById('password');
  const errorElem1 = document.getElementById('password-error');
  const usernameInput = document.getElementById('username');
  const errorElem2 = document.getElementById('username-error');
  const btn = document.getElementById('btn');

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      errorElem1.textContent = '';
      const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!passwordRequirements.test(password) && password.length > 0) {
        errorElem1.textContent = 'Lozinka mora biti duža od 6 karaktera i mora sadržati mala slova, barem jedno veliko slovo i broj';
        errorElem1.style.color = 'red';
      }
    });
  }

  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      const username = usernameInput.value;
      errorElem2.textContent = '';
      if (username.length > 25) {
        errorElem2.textContent = 'Username ne sme biti veći od 25 karaktera';
        errorElem2.style.color = 'red';
      }
    });
  }

  if (btn) {
    btn.addEventListener('click', (event) => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

      if (!passwordRequirements.test(password) || username.length > 25) {
        event.preventDefault();
        errorElem1.textContent = 'Lozinka mora sadržati malo slovo, veliko slovo i barem jedan broj.';
        errorElem1.style.color = 'red';
        if (username.length > 25) {
          errorElem2.textContent = 'Username ne sme biti veći od 25 karaktera';
          errorElem2.style.color = 'red';
        }
      } else {
        checkUser(username, password);
        console.log(hash(password));
      }
    });
  }
};

export const checkUser = (username, password) => {
    fetch('https://korisnik.free.beeceptor.com/podaci')
    .then(response => response.json())
    .then(data => {
        if (data && data.users) {
            const users = data.users;
            const user = users.find(u => u.username === username);

            if (!user) {
                alert("Korisnik sa unetim imenom ne postoji");
                return;
            }

            // Heširanje unete lozinke
            const hashedPassword = hash(password);

            if (user.password === hashedPassword) {
                window.location.href="../dist/index.html"
                alert("Uspešno logovanje");
                localStorage.setItem('ulogovan', JSON.stringify(user));
            } else {
                alert("Password nije validan");
            }
        } else {
            alert("Nema podataka u podaci.json");
        }
    })
    .catch(error => console.log(error));
};
