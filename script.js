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

    canvas.onmousedown = function(){
        scratching = true;
    };

    canvas.onmouseup = function(){
        scratching = false;
    };

    canvas.onmousemove = function(e){
        if(!scratching) return;

        let rect = canvas.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x,y,20,0,Math.PI*2);
        ctx.fill();
    };
  canvas.ontouchstart = function(e){
    scratching = true;
};

canvas.ontouchend = function(){
    scratching = false;
};

canvas.ontouchmove = function(e){
    e.preventDefault();

    if(!scratching) return;

    let rect = canvas.getBoundingClientRect();

    let x = e.touches[0].clientX - rect.left;
    let y = e.touches[0].clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
};

    let chance = Math.floor(Math.random() * 100);
let offer = "";

if (chance < 40) {
    offer = "🎉 Congratulations! You Won 10% OFF";
} else if (chance < 70) {
    offer = "🎉 Congratulations! You Won 5% OFF";
} else if (chance < 90) {
    offer = "🎉 Congratulations! You Won 15% OFF";
} else if (chance < 96) {
    offer = "🚚 Congratulations! You Won Free Shipping";
} else if (chance < 98) {
    offer = "👕 Congratulations! You Won Free T-Shirt (Selected Orders)";
} else {
    offer = "🎁 Congratulations! You Won Buy 1 Get 1 Free";
}

document.getElementById("result").style.display = "block";
document.getElementById("result").innerHTML = offer;
  
}