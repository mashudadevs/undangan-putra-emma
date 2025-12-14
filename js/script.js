// ===========================
// 1. OPEN INVITATION
// ===========================
document.getElementById('open').addEventListener('click', () => {

    const cover = document.querySelector('#cover');
    const audio = document.getElementById('music');

    // animasi menutup cover
    cover.style.marginTop = "-100rem";
    cover.style.opacity = "0";
    cover.style.transition = "all 1s ease-in-out";

    setTimeout(() => cover.classList.add('hidden'), 1500);

    // autoplay audio
    audio.muted = false;
    audio.volume = 1;
    audio.play().catch(err => console.log("Autoplay gagal:", err));

    // tombol play berubah ke pause
    const playerButton = document.querySelector('.player-button');
    if (playerButton) {
        playerButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
                <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4
                a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
        `;
    }
});


// ===========================
// 2. SCROLL ANIMATION (Versi Ringkas)
// ===========================

const scrollElements = [
    '.flower', '.title', '.opening', '.profiles', '.profile-1', '.profile-2',
    '.dan', '.dan2', '.flower2', '.title2', '.flower3', '.title3',
    '.flower4', '.title4', '.flower5', '.title5',
    '.card1', '.card2',
    '.circle1', '.circle2', '.circle3', '.circle4',
    '.btn-map'
];

function handleScroll() {
    const wScroll = window.scrollY + 600;

    scrollElements.forEach(selector => {
        const el = document.querySelector(selector);
        if (!el) return; // aman jika element dihapus

        (wScroll > el.offsetTop)
            ? el.classList.add('muncul')
            : el.classList.remove('muncul');
    });
}

window.addEventListener('scroll', handleScroll);


// ===========================
// 3. LIGHTBOX GALLERY (Kode aman meskipun gallery dihapus)
// ===========================
const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");

function openFullImg(pic) {
    if (!fullImgBox) return;
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
}

function closeFullImg() {
    if (!fullImgBox) return;
    fullImgBox.style.display = "none";
}


// ===========================
// 4. AUDIO PLAYER BUTTON
// ===========================
// const audio = document.getElementById('music');
// const playerButton = document.querySelector('.player-button');

// playerButton.addEventListener('click', () => {
//     if (audio.paused) {
//         audio.play();
//         playerButton.innerHTML = pauseIcon();
//     } else {
//         audio.pause();
//         playerButton.innerHTML = playIcon();
//     }
// });


// AUDIO PLAY saat klik OPEN INVITATION
document.getElementById('open').addEventListener('click', () => {

    const cover = document.querySelector('#cover');
    const audio = document.getElementById('music');

    cover.style.marginTop = "-100rem";
    cover.style.opacity = "0";
    cover.style.transition = "all 1s ease-in-out";

    setTimeout(() => cover.classList.add('hidden'), 1500);

    // audio play
    audio.muted = false;
    audio.play().catch(err => console.log("Autoplay error:", err));
});


// PAUSE BUTTON
const audio = document.getElementById('music');
const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        pauseBtn.innerText = "❚❚";  // pause icon
    } else {
        audio.pause();
        pauseBtn.innerText = "▶";    // play icon
    }
});





function playIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" fill="#3D3132" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 
        8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
    </svg>`;
}

function pauseIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" fill="#3D3132" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 
        1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 
        00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>`;
}


// ===========================
// 5. COUNTDOWN (Menuju 10 Januari 2026)
// ===========================
const target = new Date("2026-01-10T08:00:00").getTime();

setInterval(() => {
    const now = Date.now();
    const diff = target - now;

    if (diff < 0) return;

    document.querySelector(".circle1 h1").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)); // days
    document.querySelector(".circle2 h1").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24); // hours
    document.querySelector(".circle3 h1").innerText = Math.floor((diff / (1000 * 60)) % 60); // minutes
    document.querySelector(".circle4 h1").innerText = Math.floor((diff / 1000) % 60); // seconds
}, 1000);



// ===========================
// 6. GUESTBOOK (LOCAL STORAGE)
// ===========================

// Load guestbook ketika halaman dibuka
document.addEventListener("DOMContentLoaded", loadGuestBook);

function addGuestBook() {
    const name = document.getElementById("gName").value;
    const address = document.getElementById("gAddress").value;
    const message = document.getElementById("gMessage").value;

    if (!name || !message) {
        alert("Nama dan pesan wajib diisi!");
        return;
    }

    const guest = {
        name,
        address,
        message
    };

    // simpan ke local storage
    let data = JSON.parse(localStorage.getItem("guestbook")) || [];
    data.push(guest);
    localStorage.setItem("guestbook", JSON.stringify(data));

    loadGuestBook();

    // reset form
    document.getElementById("gName").value = "";
    document.getElementById("gAddress").value = "";
    document.getElementById("gMessage").value = "";
}

function loadGuestBook() {
    const list = document.getElementById("guestList");
    let data = JSON.parse(localStorage.getItem("guestbook")) || [];

    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `
            <div class="p-4 bg-white border rounded shadow">
                <h3 class="font-semibold text-lg">${item.name}</h3>
                ${item.address ? `<p class="text-sm">${item.address}</p>` : ""}
                <p class="mt-2">${item.message}</p>
            </div>
        `;
    });
}





// ===========================
// QUERY PARAM UNTUK NAMA TAMU
// ===========================
function applyGuestName() {
    const params = new URLSearchParams(window.location.search);
    const nama = params.get("nama");

    const receiver = document.getElementById("receiverName");

    if (receiver) {
        receiver.innerHTML = `
            Kepada Yth.<br>
            Bapak/Ibu/Saudara/i<br>
            <span class="font-bold text-[16px] sm:text-[20px]">
                ${nama ? nama : "Tamu Undangan"}
            </span>
        `;
    }

    // Otomatis isi guestbook
    const gName = document.getElementById("gName");
    if (gName && nama) gName.value = nama;
}

applyGuestName();


