// ---------------------------
// DASHKOO MAIN SCRIPT
// ---------------------------

// Ambil elemen penting dari HTML
const menuButtons = document.querySelectorAll('#menu button');
const dashboard = document.getElementById('dashboard');

// ---------------------------
// FUNGSI: Mengganti isi dashboard sesuai menu
// ---------------------------
function loadSection(section) {
  dashboard.innerHTML = ''; // Kosongkan isi dashboard

  switch (section) {
    case 'home':
      // Teks sambutan di halaman utama
      dashboard.innerHTML = `
        <section id="home" class="active">
          <h2>Selamat Datang di Dashkoo</h2>
          <p>
            Ini adalah website portofolio tim pemula yang belajar HTML, CSS, dan JavaScript
            lewat praktek langsung. Klik menu di atas untuk melihat bagian lain!
          </p>
        </section>
      `;
      break;

    case 'profile':
      loadProfiles(); // Panggil fungsi khusus untuk memuat profil
      break;

    case 'projects':
      // Placeholder sementara untuk proyek
      dashboard.innerHTML = `
        <section id="projects">
          <h2>Proyek Dashkoo</h2>
          <p>Proyek-proyek akan ditampilkan di sini (rencana pengembangan selanjutnya).</p>
        </section>
      `;
      break;

    default:
      loadSection('home');
      break;
  }
}

// ---------------------------
// FUNGSI: Menampilkan profil anggota dari members.js
// ---------------------------

function loadProfiles() {
  dashboard.innerHTML = `<h2>Memuat data anggota...</h2>`;

  try {
    // Data diambil langsung dari variabel global `membersData`
    const members = membersData;

    // Buat kontainer utama profil
    const section = document.createElement('section');
    section.id = 'profile';
    section.innerHTML = `<h2>Profil Anggota Tim</h2>`;

    // Buat wadah berbentuk grid
    const grid = document.createElement('div');
    grid.classList.add('profile-grid');

    // Buat kartu untuk setiap anggota
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        ${member.bio ? `<p class="bio">${member.bio}</p>` : ''}
      `;

      grid.appendChild(card);
    });

    // Tambahkan grid ke dashboard
    section.appendChild(grid);
    dashboard.innerHTML = ''; // Hapus teks "Memuat..."
    dashboard.appendChild(section);
  } catch (error) {
    dashboard.innerHTML = `<p style="color:red;">Gagal memuat data anggota.</p>`;
    console.error('Error loading profiles:', error);
  }
}

// ---------------------------
// EVENT LISTENER MENU
// ---------------------------
menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section');
    loadSection(section);
  });
});

// ---------------------------
// Jalankan halaman Home saat pertama kali dibuka
// ---------------------------
loadSection('home');