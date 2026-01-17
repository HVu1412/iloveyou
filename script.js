// Ngày bắt đầu yêu nhau: 30/07/2025 20:00:00 (giờ VN)
const startDate = new //Date('2025-07-30T20:00:00+07:00'); 
Date('2026-01-17T16:00:00+07:00');
let lastDayCount = 0;

function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }
    setInterval(addHeart, 3000);
}

function updateTimer() {
    const now = new Date();
    const timeDiff = now - startDate;

    if (timeDiff < 0) {
        ['years','months','days','hours','minutes','seconds']
            .forEach(id => document.getElementById(id).textContent = '0');
        return;
    }

    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const totalDays    = Math.floor(totalHours / 24);

    // Tính số năm và tháng
    let years = 0, months = 0;
    let tempDate = new Date(startDate);
    while (tempDate <= now) {
        let next = new Date(tempDate);
        next.setMonth(next.getMonth() + 1);
        if (next <= now) {
            months++;
            tempDate = next;
            if (months === 12) { years++; months = 0; }
        } else break;
    }

    const days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    const hours   = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (totalDays > lastDayCount) {
        lastDayCount = totalDays;
    }
}

// function showCelebration() {
//    const celebration =
// document.getElementById('celebration');
//    celebration.classList.add('show');
//    setTimeout(() => celebration.classList.remove('show'), 3000);
// }

createHearts();
updateTimer();
setInterval(updateTimer, 1000);

// window.addEventListener('load', () => {
//    setTimeout(showCelebration, 1000);
// });