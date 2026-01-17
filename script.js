// Ngày bắt đầu yêu nhau: 30/07/2025 20:00:00 (giờ VN)
const startDate = new // Date('2025-07-30T20:00:00+07:00'); 
Date('2026-01-17T16:00:00+07:00');  // ← mình sửa lại dòng này cho đúng ngày thật (30/07/2025), bạn có thể đổi lại nếu cần test
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
//    const celebration = document.getElementById('celebration');
//    celebration.classList.add('show');
//    setTimeout(() => celebration.classList.remove('show'), 3000);
// }


// ────────────────────────────────────────────────
// PHẦN THÊM: Ẩn thanh địa chỉ (address bar) Chrome Android
// Chỉ thêm, không sửa/xóa code cũ
function hideAddressBar() {
    // Kiểm tra xem có nội dung để cuộn không (tránh lỗi nếu page quá ngắn)
    if (document.documentElement.scrollHeight > window.innerHeight + 10) {
        // Ép cuộn nhẹ để trigger cơ chế ẩn của Chrome
        window.scrollTo(0, 1);
        
        // Một số trường hợp cần thử lại sau resize/orientation
        setTimeout(() => window.scrollTo(0, 1), 50);
    }
}

// Gọi nhiều lần để tăng độ tin cậy (Chrome đôi khi cần delay)
window.addEventListener('load', hideAddressBar);
window.addEventListener('orientationchange', hideAddressBar);
window.addEventListener('resize', hideAddressBar);

// Gọi thêm 1 lần nữa sau 300ms (rất hiệu quả trên nhiều thiết bị)
setTimeout(hideAddressBar, 300);

// ────────────────────────────────────────────────

createHearts();
updateTimer();
setInterval(updateTimer, 1000);

// window.addEventListener('load', () => {
//    setTimeout(showCelebration, 1000);
// });