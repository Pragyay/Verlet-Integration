box = {
    points: [],
    sticks: [],

    p1 : {},
    p2 : {},
    p3 : {},
    p4 : {},

    s1: {},
    s2: {},
    s3: {},
    s4: {},
    s5: {},


    distance(p1, p2){
        let dx = p1.x - p2.x,
            dy = p1.y - p2.y;
    
        return Math.sqrt(dx*dx + dy*dy);
    },

    setPoints(_x, _y, length, breadth){
        this.p1 = {
            x: _x,
            y: _y,
            oldx: _x - 20 + Math.random()*30 ,
            oldy: _x - 20 + Math.random()*30 
        }
        this.p2 = {
            x: _x + length,
            y: _y,
            oldx: _x + length,
            oldy: _y
        }
        this.p3 = {
            x: _x+length,
            y: _y+breadth,
            oldx: _x+length,
            oldy: _y+breadth
        }
        this.p4 = {
            x: _x,
            y: _y+breadth,
            oldx: _x,
            oldy: _y+breadth
        }

        this.points.push(this.p1);
        this.points.push(this.p2);
        this.points.push(this.p3);
        this.points.push(this.p4);

        console.log(this.points);
    },

    setSticks(){
        this.s1 = {
            p1: this.p1,
            p2: this.p2,
            length: this.distance(this.p1, this.p2)
        }
        this.s2 = {
            p1: this.p2,
            p2: this.p3,
            length: this.distance(this.p2, this.p3)
        }
        this.s3 = {
            p1: this.p3,
            p2: this.p3,
            length: this.distance(this.p3, this.p4)
        }
        this.s4 = {
            p1: this.p4,
            p2: this.p1,
            length: this.distance(this.p4, this.p1)
        }
        
        this.s5 = {
            p1: this.p1,
            p2: this.p3,
            length: this.distance(this.p1, this.p3)
        }

        this.sticks.push(this.s1);
        this.sticks.push(this.s2);
        this.sticks.push(this.s3);
        this.sticks.push(this.s4);
        this.sticks.push(this.s5);

        // console.log(this.sticks);
    },

    generateBox(_x, _y, length, breadth){
        var obj = Object.create(this);

        obj.setPoints(_x, _y, length, breadth);
        obj.setSticks();    

        return obj;
    },

}