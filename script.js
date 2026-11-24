/**
 * PORTFÓLIO - THIAGO JULIANI DE OLIVEIRA
 * Scripts de Interatividade, Filtros, Modal de Vídeo e Tema
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. TEMA ESCURO / CLARO COM LOCALSTORAGE
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('tjo_theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        // Ícone da Lua para alternar de volta ao escuro
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        // Ícone do Sol para alternar para o claro
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
    }
    localStorage.setItem('tjo_theme', theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  // ==========================================
  // 2. MENU MOBILE HAMBURGER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Fechar ao clicar em qualquer link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 3. SCROLL SPY & SOMBRA DO CABEÇALHO
  // ==========================================
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sombra do header
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy ativo
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. FILTROS DA SEÇÃO DE PROJETOS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. MODAL DE VÍDEO EXPANDIDO
  // ==========================================
  const videoModal = document.getElementById('video-modal');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoModalDesc = document.getElementById('video-modal-desc');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalSource = document.getElementById('video-modal-source');
  const videoModalPlayer = document.getElementById('video-modal-player');
  const openModalBtns = document.querySelectorAll('.btn-watch-modal');

  function openVideoModal(videoSrc, title, desc) {
    if (!videoModal || !videoModalPlayer) return;

    videoModalTitle.textContent = title;
    videoModalDesc.textContent = desc;

    // Pausar outros vídeos que estejam tocando na página
    document.querySelectorAll('.project-video').forEach(v => v.pause());

    videoModalPlayer.src = videoSrc;
    videoModalPlayer.load();
    videoModal.classList.add('active');
    videoModalPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !videoModalPlayer) return;
    videoModalPlayer.pause();
    videoModalPlayer.src = '';
    videoModal.classList.remove('active');
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = btn.getAttribute('data-video');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      openVideoModal(videoSrc, title, desc);
    });
  });

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // Pausar outros vídeos quando um der play
  const allCardVideos = document.querySelectorAll('.project-video');
  allCardVideos.forEach(vid => {
    vid.addEventListener('play', () => {
      allCardVideos.forEach(otherVid => {
        if (otherVid !== vid) {
          otherVid.pause();
        }
      });
    });
  });

  // ==========================================
  // 6. COPIAR PARA ÁREA DE TRANSFERÊNCIA & TOAST
  // ==========================================
  const toastMsg = document.getElementById('toast-msg');

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3000);
  }

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copiado: ${textToCopy}`);
        }).catch(() => {
          showToast('Não foi possível copiar automaticamente.');
        });
      }
    });
  });

});
