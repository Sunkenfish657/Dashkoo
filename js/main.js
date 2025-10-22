
// ---------------------------
// DASHKOO MAIN SCRIPT
// ---------------------------

// Ambil elemen penting
const menuButtons = document.querySelectorAll('#menu button');
const dashboard = document.getElementById('dashboard');

// Fungsi untuk mengganti isi dashboard
function loadSection(section) {
  // Kosongkan dashboard dulu
  dashboard.innerHTML = '';

  // Pilih konten berdasarkan menu
  switch (section) {
    case 'home':
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
      loadProfiles(); // fungsi terpisah untuk ambil data anggota
      break;

    case 'projects':
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
// FUNGSI: memuat data anggota dari members.json
// ---------------------------
function loadProfiles() {
  dashboard.innerHTML = `<h2>Memuat data anggota...</h2>`;

  fetch('https://Sunkenfish657.github.io/Dashkoo/data/members.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal memuat members.json');
      }
      return response.json();
    })
    .then(members => {
      // Buat elemen container untuk daftar anggota
      const section = document.createElement('section');
      section.id = 'profile';
      section.innerHTML = `<h2>Profil Anggota Tim</h2>`;

      // Buat wadah grid
      const grid = document.createElement('div');
      grid.classList.add('profile-grid');

      // Loop semua anggota dari JSON
      members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Isi tiap kartu anggota
        card.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.role}</p>
          ${member.bio ? `<p class="bio">${member.bio}</p>` : ''}
        `;

        grid.appendChild(card);
      });

      section.appendChild(grid);
      dashboard.innerHTML = ''; // Hapus teks "Memuat..."
      dashboard.appendChild(section);
    })
    .catch(error => {
      dashboard.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

// ---------------------------
// Event listener menu
// ---------------------------
menuButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const section = btn.getAttribute('data-section');
    loadSection(section);
  });
});

// Tampilkan halaman Home saat pertama kali dibuka
loadSection('home');