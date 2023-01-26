let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let raf;
let start_btn = document.getElementById('start');
let stop_btn = document.getElementById('stop')

let ball = {
    x: 300,
    y: 150,
    radius: 10,
    vx: 1,
    vy: 1,
    color: '#eff2dc',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill()

    }
}
let rect1 = {
    x: 10,
    y: 100,
    w: 15,
    h: 100,
    color: '#ad3638',
    draw: function() {
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        ctx.roundRect(this.x, this.y, this.w, this.h, [10,10,10,10]);
        ctx.closePath();
        ctx.fill();
    }
}
let rect2 = {
    x: 575,
    y: 100,
    w: 15,
    h: 100,
    color: '#3656ad',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.w, this.h,  [10,10,10,10]);
        ctx.closePath();
        ctx.fill();
    }
}

let score = {
    first: 0,
    second: 0,
    draw: function() {
        ctx.font = '48px serif';
        ctx.fillText(this.first, 265, 50);
        ctx.fillText(this.second, 310, 50)
    }
}
let result = {
    draw: function() {
        ctx.font = '58px serif';
        ctx.strokeText('КОНГРАТЮЛЕЙШЕНС', 0, 170)
    }
}

pokazi();
function line() {
    ctx.beginPath();
    ctx.moveTo(300,0);
    ctx.lineTo(300,300)
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300,150, 25, 0, Math.PI * 2, true)
    ctx.closePath();
    ctx.stroke()

}
function pokazi() {
    score.draw();
    line();
    ball.draw();
    rect2.draw();
    rect1.draw();
}

function touch() {
    if (ball.x == rect1.x + rect1.w && ball.y >= rect1.y && ball.y <= rect1.y + rect1.h)  {
        
        ball.vx = -ball.vx;
      
    }
    if (ball.x == rect2.x - rect2.w && ball.y >= rect2.y && ball.y <= rect2.y + rect2.h) {
       
        ball.vx = -ball.vx
        
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height); 
    touch();
 

    if (ball.y + ball.vy > 300 || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy
    }
    ball.x += ball.vx;
    ball.y += ball.vy;
   

   
    if (ball.x < 0) {
        score.second += 1
        ball.x = 300;
        ball.y = 150;

        
        if (score.second === 3) {
            result.draw();
            
            score.first = 0;
            score.second = 0;
            canvas.cancelAnimationFrame(raf);
        }
    } else if (ball.x > 600) {
        score.first += 1; 
        ball.x = 300;
        ball.y = 150;
        
        if (score.first === 3) {
            result.draw();
            
            score.first = 0;
            score.second = 0;
            canvas.cancelAnimationFrame(raf);
        }
    }
   


    
    pokazi();
    raf = window.requestAnimationFrame(draw);
}


start_btn.addEventListener('click', function() {
    raf = window.requestAnimationFrame(draw);
})
stop_btn.addEventListener('click', function() {
    window.cancelAnimationFrame(raf);
})

canvas.addEventListener('mousemove', function(e) {
    
    if (e.clientX < 300) {
    rect1.y = e.clientY -10; 
}    else  {
    rect2.y = e.clientY - 10;
}
}
);
