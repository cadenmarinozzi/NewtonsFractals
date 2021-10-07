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

function f(x) { // f(x) = x^3 - 1
    return x.mul(x).mul(x).sub(new Cnum(1, 0)); 
}

function fPrime(x) { // f'(x) = 2x^2
    return new Cnum(2, 0).mul(x).mul(x); 
}

function newtonsMethod(x) { 
    return x.sub(f(x).div(fPrime(x))); // Xn+1 = Xn-f(Xn)/f'(Xn)
}

let canvas = document.getElementsByTagName("canvas")[0];
let context = canvas.getContext("2d");
let width = window.innerWidth, height = window.innerHeight;
let centerX = width / 2, centerY = height / 2;
let scale = 250;
let error = 1e-2;
let maxIterations = 100;
canvas.width = width, canvas.height = height;

for (let x = -centerX; x < centerX; x++) { // real
    for (let y = -centerY; y < centerY; y++) { // imagainary
        let scaled = new Cnum(x / scale, y / scale); // initial guess -Cx - Cxi
        let zero = newtonsMethod(scaled);
        let x1 = newtonsMethod(zero);
        let iterations = 0;

        while (Math.abs(x1.real - zero.real) > error && iterations < maxIterations) {
            zero = x1;
            x1 = newtonsMethod(x1);
            iterations++;
        }

        let alpha = iterations / 20;
        context.fillStyle = "rgba(121, 38, 255, " + alpha + ")";

        if (zero.real > 1) {
            context.fillStyle = "rgba(255, 38, 89, " + alpha + ")";
        }

        context.fillRect(x + centerX, y + centerY, 1, 1); // centered point
    }
}
