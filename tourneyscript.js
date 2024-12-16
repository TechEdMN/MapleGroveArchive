document.getElementById('registration-form').addEventListener('submit', async function(e) {
  e.preventDefault();
//2
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('https://publicmowing.site.blueastroid.com/mncares/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Registration successful!');
      generateBracket();  // Call function to generate the bracket
    } else {
      alert('Registration failed.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('There was an error with the registration. Please try again.');
  }
});

async function generateBracket() {
  try {
    const response = await fetch('https://publicmowing.site.blueastroid.com/api/participants');
    const data = await response.json();

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
  } catch (error) {
    console.error('Error generating bracket:', error);
    alert('There was an error generating the bracket. Please try again later.');
  }
}
