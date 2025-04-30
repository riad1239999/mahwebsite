
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
