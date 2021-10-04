class Cnum {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add(b) {
        let newA = this.real + b.real;
        let newB = this.imaginary + b.imaginary;

        return new Cnum(newA, newB);
    }

    sub(b) {
        let newA = this.real - b.real;
        let newB = this.imaginary - b.imaginary;

        return new Cnum(newA, newB);
    }

    mul(b) {
        let newA = this.real * b.real - this.imaginary * b.imaginary;
        let newB = this.imaginary * b.real + this.real * b.imaginary;

        return new Cnum(newA, newB);
    }

    div(b) {
        let denominator = b.real * b.real + b.imaginary * b.imaginary;
        let newA = (this.real * b.real + this.imaginary * b.imaginary) / denominator;
        let newB = (this.imaginary * b.real - this.real * b.imaginary) / denominator;

        return new Cnum(newA, newB);
    }
}

function f(x) { 
    return x.mul(x).mul(x).sub(new Cnum(1, 0)); 
}

function fPrime(x) { // f'(x)
    return new Cnum(3, 0).mul(x).mul(x); 
}

function newtonRaphson(x) { 
    return x.sub(f(x).div(fPrime(x))); // Xn + 1 = Xn - f(Xn) / f'(Xn)
}

let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let width = window.innerWidth, height = window.innerHeight;
let centerX = width / 2, centerY = height / 2;
let zoomX = 1000, zoomY = 1000;
let error = 1e-2;
let maxIterations = 100;
canvas.width = width, canvas.height = height;

for (let x = -centerX; x < centerX; x++) {
    for (let y = -centerY; y < centerY; y++) {
        let scaled = new Cnum(x / zoomX, y / zoomY);
        let root = newtonRaphson(scaled);
        let x1 = newtonRaphson(root);
        let iterations = 0;

        while (Math.abs(x1.real - root.real) > error && iterations <= maxIterations){ // Newtons method
            root = x1;
            x1 = newtonRaphson(x1);
            iterations++;
        }

        let alpha = iterations / 20;
        context.fillStyle = "rgba(121, 38, 255, " + alpha + ")";

        if (root.real > 1) {
            context.fillStyle = "rgba(255, 38, 100, " + alpha + ")";
        }

        context.fillRect(x + centerX, y + centerY, 1, 1);
    }
}
