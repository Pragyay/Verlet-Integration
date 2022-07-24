let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

let boxes = [];

for(let i = 0; i < 3; i++){

    let x = Math.random()*500,
        y = Math.random()*500,
        length = 100 ,
        breadth = 100 ;

    boxes.push(box.generateBox(x , y, length, breadth));

    // for(let j = 0; j < 4; j++){
    //     console.log(boxes[i].points[j]);
    // }
}

let ball_radius = 10,
    bounce = 0.9,                     // reduce velocity after every bounce
    gravity = 0.05,
    friction = 0.99;

update();

function update(){
    updatePoints();
    // updateSticks();

    renderPoints();
    renderSticks();

    requestAnimationFrame(update);
}

function updatePoints(){

    for(let i = 0; i < boxes.length; i++){
        for(let j = 0; j < boxes.length*4; j++){
            let p = boxes[i].points[j],
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
    // console.log("pts");
    
}

function renderPoints(){
    ctx.clearRect(0,0,width,height);
    for(let i = 0; i < boxes.length; i++){
        for(let j = 0; j < boxes.length*4; j++){
            let p = boxes[i].points[j];
    
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(p.x, p.y, ball_radius, 0, Math.PI*2);
            ctx.fill();
        }
    }
    
}

function updateSticks(){
    for(let i = 0; i < boxes.length; i++){
        for(let j = 0; j < boxes.length*5; j++){
            let s = boxes[i].sticks[j];
            
            // console.log(s.p2.x, s.p1.x);
            // console.log(s.length);

            let dx = Math.round(s.p2.x) - Math.round(s.p1.x),
                dy = Math.round(s.p2.y) - Math.round(s.p1.y),
                
                distance = Math.round(Math.sqrt(dx*dx + dy*dy)),
    
                difference = Math.round(distance - s.length),
                percent = Math.round(difference / distance / 2),
                offsetX = dx * percent,
                offsetY = dy * percent;

            console.log(dx, dy);

            s.p1.x += offsetX;
            s.p1.y += offsetY;
    
            s.p2.x -= offsetX;
            s.p2.y -= offsetY;
    
        }
    }
    // console.log("updated");
}

function renderSticks(){
    ctx.beginPath();
    for(let i = 0; i < boxes.length; i++){
        for(let j = 0; j < boxes.length*5; j++){
            let s = boxes[i].sticks[j];

            ctx.moveTo(s.p1.x, s.p1.y);
            ctx.lineTo(s.p2.x, s.p2.y);
        }
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    
}
    