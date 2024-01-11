class Circle {
    constructor(cx, cy, radius) {
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
    }

    static generateCircles(n, width, height, margin, minRadius) {
        let circles = [];
        for (let i = 0; i < n; i++) {
            // generate center and radius
            let cx = Math.floor(Math.random() * (width - 2 * margin - 2 * minRadius)) + margin + minRadius;
            let cy = Math.floor(Math.random() * (height - 2 * margin - 2 * minRadius)) + margin + minRadius;
            let maxRadius1 = Math.min(cx - minRadius, width - margin - cx);
            let maxRadius2 = Math.min(cy - minRadius, height - margin - cy);
            let maxRadius = Math.min(maxRadius1, maxRadius2);
            let radius = Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;
            circles.push(new Circle(cx, cy, radius));
        }
        return circles;
    }
    draw(canvas, color,lineWidth) {
        let cx = this.cx;
        let cy = this.cy;
        let radius = this.radius;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Utils {
    static xIntersections(y, circles, maxX) {
        let lst = [];
        lst.push(0);
        //circle equation (x-cx)^2+(y-cy)^2 = r^2;
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            if (circle.radius > Math.abs(y - circle.cy)) {
                let d = Math.sqrt(circle.radius * circle.radius - (y - circle.cy) * (y - circle.cy));
                let x1 = Math.round(circle.cx - d);
                let x2 = Math.round(circle.cx + d);
                if (x1 !== x2) {
                    lst.push(x1);
                    lst.push(x2);
                }
            }
        }
        lst.push(maxX);
        let result = lst.sort((a, b) => a - b);
        return result;
    }
    static drawLine(canvas, color, lineWidth,x1,y1,x2,y2)
    {
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
function generate() {
    const canvas = document.getElementById('pnlCanvas');
    
    const lineWidth = 2;
    const color = "black";
    
    const n = document.getElementById("txtCount").value;
    const width = pnlCanvas.clientWidth;
    const height = pnlCanvas.clientHeight;
    const margin = 10;
    const minRadius = 10;
    let circles = Circle.generateCircles(n, width, height, margin, minRadius);

    for (let i = 0; i < n; i++) {
        let circle = circles[i];
        circle.draw(canvas, color, lineWidth);
    }
   
    const firstColor = document.getElementById("color1").value; //'red';
    const secondColor = document.getElementById("color2").value; //'blue';
    let isFirstColor = true;


    for (let y = 0; y < height; y += 1) {
        isFirstColor = true;
        let xarr = Utils.xIntersections(y, circles, width);
        for (let i = 0; i < xarr.length - 1; i++) {
            if (isFirstColor) {
                Utils.drawLine(canvas, firstColor, lineWidth,xarr[i], y, xarr[i + 1], y);
                isFirstColor = false;
            } else {
                Utils.drawLine(canvas, secondColor, lineWidth,xarr[i], y, xarr[i + 1], y);
                isFirstColor = true;
            }
        }
    }
}
function clearAll() {
    const canvas = document.getElementById('pnlCanvas');  
    const width = pnlCanvas.clientWidth;
    const height = pnlCanvas.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
}