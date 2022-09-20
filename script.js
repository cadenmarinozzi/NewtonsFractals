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

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const centerX = width / 2, centerY = height / 2;
const scale = 250;
const error = 1e-2;
const maxIterations = 100;

for (let x = -centerX; x < centerX; x++) { // real
    for (let y = -centerY; y < centerY; y++) { // imagainary
        const scaled = new Cnum(x / scale, y / scale); // initial guess -Cx - Cxi
        
        let zero = newtonsMethod(scaled);
        let x1 = newtonsMethod(zero);
        
        let iterations = 0;

        while (Math.abs(x1.real - zero.real) > error && iterations < maxIterations) {
            zero = x1;
            x1 = newtonsMethod(x1);
            iterations++;
        }

        const alpha = iterations / 20;
        
        context.fillStyle = zero.real > 1 ? 
            `rgba(255, 38, 89, ${alpha})` : 
            `rgba(121, 38, 255, ${alpha})`;
        context.fillRect(x + centerX, y + centerY, 1, 1); // centered point
    }
}
