let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let points = []
    sticks = [],
    ball_radius = 10,
    bounce = 0.9,                     // reduce velocity after every bounce
    gravity = 0.5,
    friction = 0.99;

points.push({
    x: 100,
    y: 100,
    oldx: 80 + Math.random()*30 - 15,
    oldy: 80 + Math.random()*30 - 15
})
points.push({
    x: 200,
    y: 100,
    oldx: 200,
    oldy: 100
})
points.push({
    x: 200,
    y: 200,
    oldx: 200,
    oldy: 200
})
points.push({
    x: 100,
    y: 200,
    oldx: 100,
    oldy: 200
})

sticks.push({
    p1: points[0],
    p2: points[1],
    length: distance(points[0], points[1])
})
sticks.push({
    p1: points[1],
    p2: points[2],
    length: distance(points[1], points[2])
})
sticks.push({
    p1: points[2],
    p2: points[3],
    length: distance(points[2], points[3])
})
sticks.push({
    p1: points[3],
    p2: points[0],
    length: distance(points[3], points[0])
})

sticks.push({
    p1: points[0],
    p2: points[2],
    length: distance(points[0], points[2])
})

function distance(p1, p2){
    let dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return Math.sqrt(dx*dx + dy*dy);
}

update();

function update(){
    updatePoints();
    updateSticks();

    renderPoints();
    renderSticks();

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
        ctx.fillStyle = "red";
        ctx.arc(p.x, p.y, ball_radius, 0, Math.PI*2);
        ctx.fill();
    }
}

function updateSticks(){
    for(let i=0; i < sticks.length; i++){
        let s = sticks[i];

        let dx = s.p2.x - s.p1.x,
            dy = s.p2.y - s.p1.y,
            distance = Math.sqrt(dx*dx + dy*dy),

            difference = distance - s.length,
            percent = difference / distance / 2,
            offsetX = dx * percent,
            offsetY = dy * percent;
        
        s.p1.x += offsetX;
        s.p1.y += offsetY;

        s.p2.x -= offsetX;
        s.p2.y -= offsetY;

    }
}

function renderSticks(){
    ctx.beginPath();
    for(let i = 0; i < sticks.length; i++){
        let s = sticks[i];
        ctx.moveTo(s.p1.x, s.p1.y);
        ctx.lineTo(s.p2.x, s.p2.y);
    }
    ctx.strokeStyle = "yellow";
    ctx.stroke();
}
    