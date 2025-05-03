const funBox = document.querySelector('.fun-box');
const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');

const jokes = [
  "Why don't programmers like nature? It has too many bugs!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "What do you call a fake noodle? An impasta!",
  "Why did the cookie go to the doctor? Because it was feeling crumbly!"
];

funBox.addEventListener('click', () => {
  funBox.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
});

jokeBtn.addEventListener('click', () => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  jokeText.textContent = randomJoke;
  jokeText.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
});

const sendRequestBtn = document.getElementById('sendRequestBtn');
const requestInput = document.getElementById('requestInput');
const requestStatus = document.getElementById('requestStatus');

sendRequestBtn.addEventListener('click', () => {
  const request = requestInput.value.trim();
  if (request) {
    sendRequestBtn.disabled = true;
    requestStatus.textContent = "Sending...";

    emailjs.send("service_s5xwhin", "template_84fzku5", {
      to_name: "Admin",
      from_name: "Website User",
      to_email: "yacinebaya9@gmail.com",
      message: request,
      reply_to: "noreply@example.com"
    }).then(() => {
      requestStatus.textContent = "We will see your email and add the thing soon!";
      requestInput.value = '';
      sendRequestBtn.disabled = false;
    }).catch(() => {
      requestStatus.textContent = "Sorry, there was an error. Please try again.";
      sendRequestBtn.disabled = false;
    });
  } else {
    requestStatus.textContent = "Please enter your request first!";
  }
});

// Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const game = {
  train: {
    x: 100,
    y: canvas.height - 100,
    lane: 0,
    width: 60,
    height: 30,
    color: '#4ecdc4',
    wheels: [{x: 10, y: 25}, {x: 50, y: 25}]
  },
  zombies: [],
  score: 0,
  gameOver: false,
  speed: 5,
  minZombieSpacing: 300,
  lastZombieX: 0
};

function drawTrain() {
  const y = game.train.y - (game.train.lane * 100);

  // Train body (darker, old-style brown)
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(game.train.x, y, game.train.width, game.train.height);

  // Chimney
  ctx.fillStyle = '#3E2723';
  ctx.fillRect(game.train.x + 10, y - 20, 15, 25);

  // Steam cloud
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath();
  ctx.arc(game.train.x + 17, y - 25, 8, 0, Math.PI * 2);
  ctx.fill();

  // Wheels
  ctx.fillStyle = '#1B0000';
  game.train.wheels.forEach(wheel => {
    ctx.beginPath();
    ctx.arc(game.train.x + wheel.x, y + wheel.y, 8, 0, Math.PI * 2);
    ctx.fill();
    // Wheel details
    ctx.beginPath();
    ctx.arc(game.train.x + wheel.x, y + wheel.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#3E2723';
    ctx.fill();
  });

  // Train window
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(game.train.x + 40, y + 5, 15, 10);
}

function createZombie() {
  const lastZombie = game.zombies[game.zombies.length - 1];
  if (!lastZombie || (canvas.width - lastZombie.x) >= game.minZombieSpacing) {
    if (Math.random() < 0.02) {
      game.zombies.push({
        x: canvas.width,
        lane: Math.random() < 0.5 ? 0 : 1,
        width: 30,
        height: 40,
        color: '#ff3366',
        armOffset: Math.random() * 5
      });
    }
  }
}

function drawZombies() {
  game.zombies.forEach(zombie => {
    const y = canvas.height - 100 - (zombie.lane * 100);

    // Zombie body (brownish dead color)
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(zombie.x, y, zombie.width, zombie.height);

    // Zombie head
    ctx.fillStyle = '#795548';
    ctx.fillRect(zombie.x + 5, y - 10, 20, 20);

    // Zombie eyes (red)
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(zombie.x + 8, y - 5, 4, 4);
    ctx.fillRect(zombie.x + 18, y - 5, 4, 4);

    // Tattered clothes
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(zombie.x + 5, y + 15, 20, 10);
  });
}

function updateZombies() {
  game.zombies = game.zombies.filter(zombie => {
    zombie.x -= game.speed;

    // Check collision
    if (
      zombie.x < game.train.x + game.train.width &&
      zombie.x + zombie.width > game.train.x &&
      zombie.lane === game.train.lane
    ) {
      game.gameOver = true;
    }

    return zombie.x + zombie.width > 0;
  });
}

function drawTracks() {
  // Desert background
  ctx.fillStyle = '#F4A460';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add some desert details
  for(let i = 0; i < 20; i++) {
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tracks
  ctx.strokeStyle = '#3E2723';
  ctx.lineWidth = 3;

  // Bottom track
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 80);
  ctx.lineTo(canvas.width, canvas.height - 80);
  ctx.stroke();

  // Top track
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 180);
  ctx.lineTo(canvas.width, canvas.height - 180);
  ctx.stroke();
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${Math.floor(game.score)}`, 10, 30);
}

function gameLoop() {
  if (game.gameOver) {
    ctx.fillStyle = '#fff';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width/2 - 100, canvas.height/2);
    ctx.font = '20px Arial';
    ctx.fillText('Press R to restart', canvas.width/2 - 70, canvas.height/2 + 40);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTracks();
  drawTrain();
  createZombie();
  drawZombies();
  updateZombies();
  drawScore();

  game.score += 0.1;
  requestAnimationFrame(gameLoop);
}

function handleInput(type) {
  if (type === 'switch' && !game.gameOver) {
    game.train.lane = game.train.lane === 0 ? 1 : 0;
  }
  if (type === 'restart' && game.gameOver) {
    game.gameOver = false;
    game.zombies = [];
    game.score = 0;
    game.train.lane = 0;
    gameLoop();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') handleInput('switch');
  if (e.code === 'KeyR') handleInput('restart');
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  handleInput('switch');
});

gameLoop();
