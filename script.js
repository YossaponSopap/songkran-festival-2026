let splashCount = 0;

const dropsContainer = document.getElementById('drops');
const counter = document.getElementById('counter');

const DROP_COLORS = ['#7ddcff', '#a8f0ce', '#ffd97d', '#f9a8d4', '#93c5fd'];
const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🏵️', '🌷'];

/* ==================== FACTORIES ==================== */

function createDrop() {
    const el = document.createElement('div');
    el.className = 'drop';
    const size = 4 + Math.random() * 10;
    const color = DROP_COLORS[Math.floor(Math.random() * DROP_COLORS.length)];
    const duration = 2.5 + Math.random() * 3;
    const delay = Math.random() * 2;

    el.style.cssText = `
        width: ${size}px;
        height: ${size * 1.4}px;
        left: ${Math.random() * 100}%;
        top: -60px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    dropsContainer.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay + 1) * 1000);
}

function createFlower() {
    const el = document.createElement('div');
    el.className = 'flower';
    el.textContent = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 2;

    el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: -40px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    dropsContainer.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay + 1) * 1000);
}

function createRing(x, y) {
    const el = document.createElement('div');
    el.className = 'ring';
    const size = 60 + Math.random() * 80;
    const duration = 0.8 + Math.random() * 0.5;

    el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        animation-duration: ${duration}s;
    `;

    dropsContainer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 0.1) * 1000);
}

function createSplashCircle(x, y) {
    const el = document.createElement('div');
    el.className = 'splash';
    const size = 80 + Math.random() * 80;

    el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
    `;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
}

/* ==================== INTERACTIONS ==================== */

function createSplash(e) {
    splashCount++;
    createSplashCircle(e.clientX, e.clientY);
    createRing(e.clientX, e.clientY);

    for (let i = 0; i < 3; i++) createDrop();

    counter.textContent = `สาดน้ำแล้ว ${splashCount} ครั้ง 💦`;
}

function splashAll(e) {
    e.stopPropagation();

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
        const x = 100 + Math.random() * window.innerWidth * 0.8;
        const y = 80 + Math.random() * 500;
        createRing(x, y);
        createDrop();
        }, i * 80);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(createFlower, i * 200);
    }

    splashCount += 15;
    counter.textContent = `สาดน้ำแล้ว ${splashCount} ครั้ง 💦`;
}

/* ==================== INIT ==================== */

function init() {
    // Initial burst of drops & flowers
    for (let i = 0; i < 20; i++) setTimeout(createDrop, i * 150);
    for (let i = 0; i < 6; i++) setTimeout(createFlower, i * 400);

    // Ongoing ambient effects
    setInterval(createDrop, 300);
    setInterval(createFlower, 1800);
}

document.getElementById('page').addEventListener('click', createSplash);
document.getElementById('splash-btn').addEventListener('click', splashAll);

init();