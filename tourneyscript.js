// scripts.js
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Send the form data to the server
  fetch('https://publicmowing.site.blueastroid.com/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful!');
      generateBracket();
    } else {
      alert('Registration failed.');
    }
  });
});

function generateBracket() {
  fetch('https://publicmowing.site.blueastroid.com/api/participants')
    .then(response => response.json())
    .then(data => {
      const participants = data.participants;
      const bracketContainer = document.getElementById('bracket-container');
      bracketContainer.innerHTML = '';

      // Shuffle participants and create bracket
      participants.sort(() => Math.random() - 0.5);

      for (let i = 0; i < participants.length; i += 2) {
        const match = document.createElement('div');
        match.className = 'match';
        match.innerHTML = `
          <div>${participants[i].name}</div>
          <div>vs</div>
          <div>${participants[i + 1] ? participants[i + 1].name : 'TBD'}</div>
        `;
        bracketContainer.appendChild(match);
      }
    });
}
