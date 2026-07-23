    function startGame() {

    let username = document.getElementById("username").value;

  // Ek user din me sirf ek baar
let today = new Date().toDateString();

if (localStorage.getItem(username) === today) {
    alert("❌ Aaj aap already scratch kar chuke ho. Kal dobara try karein.");
    return;
}

  
    if(username.trim() == ""){
        alert("Please enter your Instagram username");
        return;
    } 
  localStorage.setItem(username, today);

    document.getElementById("message").innerHTML =
        "🎉 Welcome " + username + "!";

    document.getElementById("scratchCard").style.display = "block";

    let canvas = document.getElementById("scratchCanvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    ctx.fillText("SCRATCH HERE",70,70);

    let scratching = false;
  function checkScratch() {
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
    }

    let percent = (transparent / (canvas.width * canvas.height)) * 100;

    if (percent > 60) {
        canvas.style.display = "none";
      startConfetti();
    }
  }

    canvas.onmousedown = function () {
    scratching = true;
};

canvas.onmouseup = function () {
    scratching = false;
};

canvas.onmousemove = function (e) {
    if (!scratching) return;

    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratch();
};

canvas.ontouchstart = function () {
    scratching = true;
};

canvas.ontouchend = function () {
    scratching = false;
};

canvas.ontouchmove = function (e) {
    e.preventDefault();

    if (!scratching) return;

    let rect = canvas.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    let y = e.touches[0].clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratch();
};

    let chance = Math.floor(Math.random() * 100);
let offer = "";

if (chance < 60) {
    offer = "😔 Better Luck Next Time!";
} else if (chance < 80) {
    offer = "🎉 Congratulations! You Won 5% OFF";
} else if (chance < 90) {
    offer = "🎉 Congratulations! You Won 10% OFF";
} else if (chance < 95) {
    offer = "🎉 Congratulations! You Won 15% OFF";
} else if (chance < 98) {
    offer = "🚚 Congratulations! You Won Free Shipping";
} else if (chance < 99) {
    offer = "👕 Congratulations! You Won Free T-Shirt (Selected Orders)";
} else {
    offer = "🎁 Congratulations! You Won Buy 1 Get 1 Free";
}

document.getElementById("result").style.display = "block";
document.getElementById("result").innerHTML = offer;
  // Offer Expiry Timer
  let btn = document.getElementById("claimBtn");
btn.style.display = "block";
let countdown = document.getElementById("countdown");
countdown.style.display = "block";

let time = 86400; // 24 hours

let timer = setInterval(function () {
    let hours = Math.floor(time / 3600);
let min = Math.floor((time % 3600) / 60);
let sec = time % 60;

countdown.innerHTML =
"⏳ Offer expires in: " +
(hours < 10 ? "0" : "") + hours + ":" +
(min < 10 ? "0" : "") + min + ":" +
(sec < 10 ? "0" : "") + sec;

    time--;

    if (time < 0) {
        clearInterval(timer);
        countdown.innerHTML = "❌ Offer Expired!";
        btn.disabled = true;
        btn.innerHTML = "Offer Expired";
    }
}, 1000);

// WhatsApp Claim Button

  btn.onclick = function () {
    window.location.href = "https://www.instagram.com/as_clothes_collection/";
};

startConfetti();
}
function startConfetti() {
    let canvas = document.getElementById("confetti");
    let ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 150,
            color: `hsl(${Math.random() * 360},100%,50%)`,
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            p.y += 3;
            p.x += Math.sin(p.d);
            p.d += 0.05;

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}