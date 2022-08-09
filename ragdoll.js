let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let points = []
    sticks = [],
    ball_radius = 25,
    bounce = 0.9,                     // reduce velocity after every bounce
    gravity = 0.5,
    friction = 0.99;

// 0
points.push({
    x: 200,
    y: 20,
    oldx: 180 + Math.random()*30,
    oldy: 20
})
//1 
points.push({
    x: 300,
    y: 20,
    oldx: 300,
    oldy: 20
})
//2
points.push({
    x: 270,
    y: 120,
    oldx: 270,
    oldy: 120,
    pinned: true
})
//3
points.push({
    x: 230,
    y: 120,
    oldx: 230,
    oldy: 120,
    pinned: true
})
//4
points.push({
    x: 210,
    y: 200,
    oldx: 210,
    oldy: 200,
    pinned: true
})
//5
points.push({
    x: 290,
    y: 200,
    oldx: 290,
    oldy:200,
    pinned: true
        
})
//6
points.push({
    x: 150,
    y: 60,
    oldx: 150,
    oldy: 60
})
//7
points.push({
    x: 140,
    y: 100,
    oldx: 140,
    oldy: 100
})
//8
points.push({
    x: 350,
    y: 60,
    oldx: 350,
    oldy: 60
})
//9
points.push({
    x: 360,
    y: 100,
    oldx: 360,
    oldy: 100
})

sticks.push({
    p1: points[0],
    p2: points[1],
    length: distance(points[0], points[1]),
    visible: true
})
sticks.push({
    p1: points[1],
    p2: points[2],
    length: distance(points[1], points[2]),
    visible: true
})
sticks.push({
    p1: points[2],
    p2: points[3],
    length: distance(points[2], points[3]),
    visible: true
})
sticks.push({
    p1: points[3],
    p2: points[0],
    length: distance(points[3], points[0]),
    visible: true
})

//legs
sticks.push({
    p1: points[3],
    p2: points[4],
    length: distance(points[3], points[4]),
    visible: true
})
sticks.push({
    p1: points[2],
    p2: points[5],
    length: distance(points[2], points[5]),
    visible: true
})

//hands
sticks.push({
    p1: points[0],
    p2: points[6],
    length: distance(points[0], points[6]),
    visible: true
})
sticks.push({
    p1: points[6],
    p2: points[7],
    length: distance(points[6], points[7]),
    visible: true
})

sticks.push({
    p1: points[1],
    p2: points[8],
    length: distance(points[1], points[8]),
    visible: true
})
sticks.push({
    p1: points[8],
    p2: points[9],
    length: distance(points[8], points[9]),
    visible: true
})

// support
sticks.push({
    p1: points[4],
    p2: points[5],
    length: distance(points[4], points[5]),
    visible: false
})
sticks.push({
    p1: points[1],
    p2: points[4],
    length: distance(points[1], points[4]),
    visible: false
})
sticks.push({
    p1: points[0],
    p2: points[5],
    length: distance(points[0], points[5]),
    visible: false
})
//diagonals
sticks.push({
    p1: points[0],
    p2: points[2],
    length: distance(points[0], points[2]),
    visible: false
})
sticks.push({
    p1: points[1],
    p2: points[3],
    length: distance(points[1], points[3]),
    visible: false
})


function distance(p1, p2){
    let dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return Math.sqrt(dx*dx + dy*dy);
}

update();

document.body.addEventListener("click",function(event){
    gravity *= (-1);
})

function update(){

    
    updatePoints();
    updateSticks();
    
    ctx.clearRect(0,0,width,height);

    // ctx.beginPath();
    // ctx.fillStyle = "white";

    // let x1 = sticks[0].p1.x + sticks[0].length/2,
    //     y1 = points[0].y-ball_radius;
    // console.log(x1,y1);
    // ctx.arc(x1, y1, ball_radius, 0, Math.PI*2);
    // ctx.fill();

    // renderPoints();
    renderSticks();

    requestAnimationFrame(update);
}

function updatePoints(){
    for(let i = 0; i < points.length; i++){
        // if(!points[i].pinned){
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

    // }
}

function renderPoints(){
    for(let i = 0; i < points.length; i++){
        let p = points[i];

        ctx.beginPath();
        ctx.fillStyle = "white";
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
        if(s.visible){
            ctx.moveTo(s.p1.x, s.p1.y);
            ctx.lineTo(s.p2.x, s.p2.y);
        }
    }
    ctx.strokeStyle = "white";
    ctx.strokeWidth = 0.1;
    ctx.stroke();
}
    