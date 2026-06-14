const imgs = [
    './assets/images/w1.jpg',
    './assets/images/w2.jpg',
    './assets/images/w3.jpg',
    './assets/images/w4.jpg'
];
let cur = 3;

function si(idx, el) {
    if (idx === cur) return;
    cur = idx;
    const m = document.getElementById('mainImg');
    m.classList.add('fade');
    setTimeout(() => {
        m.src = imgs[idx];
        document.getElementById('mImg').src = imgs[idx];
        m.classList.remove('fade');
    }, 160);
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function sc(idx, el) {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    si(idx, document.querySelectorAll('.thumb')[idx]);
}

function cq(d) {
    const input = document.getElementById('qv');
    input.value = Math.max(1, Math.min(99, parseInt(input.value) + d));
}

function addCart() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

function tw(btn) {
    const icon = document.getElementById('wi');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.style.color = '#e53935';
    } else {
        icon.classList.replace('fa-solid', 'fa-regular');
        icon.style.color = '';
    }
}

function openModal() {
    document.getElementById('imgModal').classList.add('open');
}

function cm(e) {
    if (!e || e.target.id === 'imgModal' || e.currentTarget.classList?.contains('modal-close')) {
        document.getElementById('imgModal').classList.remove('open');
    }
}

let relIndex = 0;

function getRelVisible() {
    return window.innerWidth <= 900 ? 2 : 5;
}

function relSlide(dir) {
    const track   = document.getElementById('relTrack');
    const cards   = track.querySelectorAll('.product-card');
    const maxIndex = cards.length - getRelVisible();

    relIndex = Math.max(0, Math.min(relIndex + dir, maxIndex));

    const cardWidth = cards[0].offsetWidth + 16; // card width + gap
    track.style.transform = `translateX(-${relIndex * cardWidth}px)`;
}

window.addEventListener('resize', () => {
    relIndex = 0;
    const track = document.getElementById('relTrack');
    if (track) track.style.transform = 'translateX(0)';
});

const ZOOM = 2.5;

function zoomMove(e) {
    const img  = document.getElementById('mainImg');
    const res  = document.getElementById('zoomResult');

    const imgRect = img.getBoundingClientRect();
    const resRect = res.getBoundingClientRect();

    const px = (e.clientX - imgRect.left) / imgRect.width;
    const py = (e.clientY - imgRect.top)  / imgRect.height;

    const bw = resRect.width  * ZOOM;
    const bh = resRect.height * ZOOM;

    const bx = px * bw - resRect.width  / 2;
    const by = py * bh - resRect.height / 2;

    res.style.backgroundImage    = `url('${img.src}')`;
    res.style.backgroundSize     = `${bw}px ${bh}px`;
    res.style.backgroundPosition = `-${bx}px -${by}px`;
}

function zoomLeave() {
    document.getElementById('zoomResult').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainImgBox').addEventListener('mouseenter', () => {
        document.getElementById('zoomResult').style.display = 'block';
    });
});

let ms = (656 * 3600 + 9 * 60 + 22) * 1000 + 150;

function pad(n, len) {
    return String(n).padStart(len, '0');
}

function tick() {
    if (ms <= 0) return;
    ms -= 100;
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const f = Math.floor((ms % 1000) / 10);
    document.getElementById('cdH').textContent = pad(h, 3);
    document.getElementById('cdM').textContent = pad(m, 2);
    document.getElementById('cdS').textContent = pad(s, 2);
    document.getElementById('cdF').textContent = pad(f, 2);
}
tick();
setInterval(tick, 100);

function openCat() {
    document.getElementById('catSidebar').classList.add('open');
    document.getElementById('catOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCat() {
    document.getElementById('catSidebar').classList.remove('open');
    document.getElementById('catOverlay').classList.remove('open');
    document.body.style.overflow = '';
}



document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCat();
});

window.addEventListener('scroll', () => {
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 300);
});
