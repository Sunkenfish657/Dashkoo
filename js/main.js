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
      loadProfiles();
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
// FUNGSI: Menampilkan daftar anggota dari members.js
// ---------------------------
function loadProfiles() {
  try {
    const members = membersData;

    const section = document.createElement('section');
    section.id = 'profile';
    section.innerHTML = `<h2>Profil Anggota Tim</h2>`;

    const grid = document.createElement('div');
    grid.classList.add('profile-grid');

    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        ${member.bio ? `<p class="bio">${member.bio}</p>` : ''}
      `;

      // Klik kartu → tampilkan detail anggota
      card.addEventListener('click', () => showMemberDetail(member));

      grid.appendChild(card);
    });

    section.appendChild(grid);
    dashboard.innerHTML = '';
    dashboard.appendChild(section);
  } catch (error) {
    dashboard.innerHTML = `<p style="color:red;">Gagal memuat data anggota.</p>`;
    console.error('Error loading profiles:', error);
  }
}

// ---------------------------
// FUNGSI: Menampilkan detail anggota yang diklik
// ---------------------------
function showMemberDetail(member) {
  const section = document.createElement('section');
  section.id = 'member-detail';
  section.innerHTML = `
    <h2>${member.name}</h2>
    <p><strong>Peran:</strong> ${member.role}</p>
    <p>${member.bio || ''}</p>

    ${
      member.details
        ? `
        <div class="details">
          ${member.details.skills ? `<p><strong>Kemampuan:</strong> ${member.details.skills.join(', ')}</p>` : ''}
          ${member.details.contact ? `<p><strong>Kontak:</strong> ${member.details.contact}</p>` : ''}
          ${member.details.github ? `<p><strong>GitHub:</strong> <a href="${member.details.github}" target="_blank">${member.details.github}</a></p>` : ''}
        </div>
        `
        : ''
    }

    <button id="backToList">← Kembali ke Daftar</button>
  `;

  dashboard.innerHTML = '';
  dashboard.appendChild(section);

  // Tombol kembali → tampilkan lagi daftar anggota
  document.getElementById('backToList').addEventListener('click', loadProfiles);
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