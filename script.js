const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const PARTICLE_COUNT = 50;

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
       this.x = Math.random() * canvas.width;
        this.y = canvas.height - Math.random() * 100; // старт снизу
        this.size = Math.random() * 4 + 2;
        this.speedY = -(Math.random() * 1.5 + 0.8); // ОТРИЦАТЕЛЬНАЯ = вверх
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.life = 1;

    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity *= 0.998;
        this.size *= 0.999;

        if (this.y < -50 || this.opacity < 0.01) {
            this.reset();
        }

        this.opacity = 0.3 + Math.sin(Date.now() * 0.002 + this.x) * 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Градиент для эффекта свечения
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(212, 160, 23, ${this.opacity})`);
        gradient.addColorStop(0.6, `rgba(150, 80, 10, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}
animate()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
