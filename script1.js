let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let points = [],
    ball_radius = 20,
    bounce = 0.95,                     // reduce velocity after every bounce
    gravity = 0.5,
    friction = 0.99;

points.push({
    x: 100,
    y: 100,
    oldx: 90,
    oldy: 90
})

update();

function update(){
    updatePoints();
    renderPoints();

    requestAnimationFrame(update);
}

function updatePoints(){
    for(let i = 0; i < points.length; i++){
        let p = points[i],
            vx = (p.x - p.oldx)*friction,
            vy = (p.y - p.oldy)*friction;

        p.oldx = p.x;
        p.oldy = p.y;

        p.x += vx;
        p.y += vy;
        p.y += gravity;

        //handling edges
        let rightEdge = (width - ball_radius),
            leftEdge = topEdge = ball_radius,
            bottomEdge = (height - ball_radius);

        if(p.x > rightEdge){
            p.x = rightEdge;
            p.oldx = p.x + vx*bounce;
        }

        else if(p.x < leftEdge){
            p.x = leftEdge;
            p.oldx = p.x + vx*bounce;
        }

        else if(p.y < topEdge){
            p.y = topEdge;
            p.oldy = p.y + vy*bounce;
        }

        else if(p.y > bottomEdge){
            p.y = bottomEdge;
            p.oldy = p.y + vy*bounce;
        }

    }
}

function renderPoints(){
    ctx.clearRect(0,0,width,height);
    for(let i = 0; i < points.length; i++){
        let p = points[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, ball_radius, 0, Math.PI*2);
        ctx.fill();
    }
}
    