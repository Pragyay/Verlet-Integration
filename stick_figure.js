let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let points = []
    sticks = [],
    ball_radius = 5,
    bounce = 0.2,                     // reduce velocity after every bounce
    gravity = 0.3,
    friction = 0.99;

points.push({
    x: 300,
    y: 20,
    oldx: 280 + Math.random()*30,
    oldy: 20
})
//1 
points.push({
    x: 300,
    y: 120,
    oldx: 300,
    oldy: 120
})
//2
points.push({
    x: 270,
    y: 180,
    oldx: 270,
    oldy: 180,
    pinned: true
})
//3
points.push({
    x: 330,
    y: 180,
    oldx: 330,
    oldy: 180,
    pinned: true
})
//4
points.push({
    x: 270,
    y: 240,
    oldx: 270,
    oldy: 240,
    pinned: true
})
//5
points.push({
    x: 330,
    y: 240,
    oldx: 330,
    oldy:240,
    pinned: true
        
})
//6
points.push({
    x: 240,
    y: 70,
    oldx: 240,
    oldy: 70
})
//7
points.push({
    x: 240,
    y: 120,
    oldx: 240,
    oldy: 120
})
//8
points.push({
    x: 360,
    y: 70,
    oldx: 360,
    oldy: 70
})
//9
points.push({
    x: 360,
    y: 120,
    oldx: 360,
    oldy: 120
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
    p1: points[1],
    p2: points[3],
    length: distance(points[1], points[3]),
    visible: true
})
sticks.push({
    p1: points[2],
    p2: points[4],
    length: distance(points[2], points[4]),
    visible: true
})
sticks.push({
    p1: points[3],
    p2: points[5],
    length: distance(points[3], points[5]),
    visible: true
})
sticks.push({
    p1: points[0],
    p2: points[6],
    length: distance(points[0], points[6]),
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
    p1: points[0],
    p2: points[8],
    length: distance(points[0], points[8]),
    visible: true
})
sticks.push({
    p1: points[8],
    p2: points[9],
    length: distance(points[8], points[9]),
    visible: true
})

// // support
// sticks.push({
//     p1: points[0],
//     p2: points[5],
//     length: distance(points[0], points[5]),
//     visible: false
// })
sticks.push({
    p1: points[0],
    p2: points[4],
    length: distance(points[0], points[4]),
    visible: false
})
sticks.push({
    p1: points[0],
    p2: points[5],
    length: distance(points[0], points[5]),
    visible: false
})
sticks.push({
    p1: points[0],
    p2: points[7],
    length: distance(points[0], points[7]),
    visible: false
})
sticks.push({
    p1: points[3],
    p2: points[4],
    length: distance(points[3], points[4]),
    visible: false
})

let Circle = {
    x: width/2,
    y: height/2
}


function distance(p1, p2){
    let dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return Math.sqrt(dx*dx + dy*dy);
}

update();

// document.body.addEventListener("click",function(event){
//     gravity *= (-1);
// }
let dragging = false;
let dragHandle;
let offset = {
    x:0,
    y:0
}
let mouse = {
    x: 0,
    y: 0
}
    
document.body.addEventListener("mousedown",function(){
    dragging = true;
})
document.body.addEventListener("mousemove",function(event){
    if(dragging){
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        
        if(mouse.x >= points[1].x - 80 && mouse.x <= points[1].x + 80
            && mouse.y >= points[1].y - 80 && mouse.y <= points[1].y + 80){
                document.body.addEventListener("mousemove",onMouseMove);
                document.body.addEventListener("mouseup",onMouseUp);

                dragHandle = points[1];
                offset.x  = event.clientX - points[1].x;
                offset.y  = event.clientY - points[1].y;
        }
        
    }
})
document.body.addEventListener("mouseup",function(){
    dragging = false;
})

function onMouseMove(event){
    dragHandle.x = event.clientX - offset.x;
    dragHandle.y = event.clientY - offset.y;
}
function onMouseUp(event){
    document.body.removeEventListener("mousemove",onMouseMove);
    document.body.removeEventListener("mouseup",onMouseUp);
}

function detectCollision(){
    let dist;
    for(let i=0;i<points.length;i++){
        let p = points[i];
        dist = Math.sqrt((Circle.x - p.x)*(Circle.x - p.x) + (Circle.y - p.y)*(Circle.y - p.y));
        if(ball_radius + 60 >= dist){
                p.y = Circle.y - 60;
                p.oldy = p.y + (p.y - p.oldy)*bounce;
                console.log("collision");
            }
    }
}

function update(){
    
    updatePoints();
    updateSticks();

    detectCollision();
    
    ctx.clearRect(0,0,width,height);

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(Circle.x, Circle.y, 60, Math.PI, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";

    let x1 = points[0].x,
        y1 = points[0].y;
    // console.log(x1,y1);
    ctx.arc(x1, y1, 20, 0, Math.PI*2);
    ctx.stroke();

    renderPoints();
    // renderSticks();

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
        if(s.visible){
            ctx.moveTo(s.p1.x, s.p1.y);
            ctx.lineTo(s.p2.x, s.p2.y);
        }
        
    }
    ctx.strokeStyle = "white";
    ctx.strokeWidth = 0.1;
    ctx.stroke();
}
    