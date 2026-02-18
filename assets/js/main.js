/* ============================================
   AMAZING RACE JEEP - MAIN JAVASCRIPT
   ============================================ */

// ─── Navbar ───────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (!navbar) return;

  // Scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Float-top button
    const floatTop = document.getElementById('floatTop');
    if (floatTop) {
      if (window.scrollY > 400) {
        floatTop.classList.add('visible');
      } else {
        floatTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.contains('open');
      navMobile.classList.toggle('open');
      navToggle.classList.toggle('open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && !navMobile.contains(e.target)) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();

// ─── Float to Top ─────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Scroll Animations ────────────────────────
(function () {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });
})();

// ─── Counter Animation ────────────────────────
(function () {
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('id-ID') + (el.getAttribute('data-suffix') || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });
})();

// ─── Blog Search & Filter ─────────────────────
(function () {
  const searchInput = document.getElementById('blogSearch');
  const catBtns = document.querySelectorAll('.cat-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('noResults');

  if (!searchInput && catBtns.length === 0) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterCards() {
    let visibleCount = 0;

    blogCards.forEach(function (card) {
      const title = card.querySelector('.blog-card-title')
        ? card.querySelector('.blog-card-title').textContent.toLowerCase()
        : '';
      const excerpt = card.querySelector('.blog-card-excerpt')
        ? card.querySelector('.blog-card-excerpt').textContent.toLowerCase()
        : '';
      const cat = card.getAttribute('data-category') || '';

      const matchesSearch =
        searchQuery === '' ||
        title.includes(searchQuery) ||
        excerpt.includes(searchQuery);

      const matchesCat = activeCategory === 'all' || cat === activeCategory;

      if (matchesSearch && matchesCat) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.classList.toggle('show', visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.toLowerCase().trim();
      filterCards();
    });
  }

  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeCategory = this.getAttribute('data-cat');
      filterCards();
    });
  });
})();

// ─── Share Buttons ────────────────────────────
function shareWA() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  window.open('https://wa.me/?text=' + title + '%20' + url, '_blank');
}

function shareFB() {
  const url = encodeURIComponent(window.location.href);
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
}

function shareTW() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + title, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(function () {
    const btn = document.querySelector('.share-copy');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Tersalin!';
      setTimeout(function () { btn.innerHTML = original; }, 2000);
    }
  });
}

// ─── WhatsApp CTA ─────────────────────────────
function openWA(packageName) {
  const phone = '6281234567890'; // Ganti dengan nomor WA aktif
  let msg = 'Halo, saya tertarik dengan Paket Outbound Amazing Race Jeep';
  if (packageName) {
    msg += ' - ' + packageName;
  }
  msg += '. Mohon informasi lebih lanjut.';
  window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
}

// ─── Active Nav Link ──────────────────────────
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ─── Testimonial Slider (simple auto-scroll) ──
(function () {
  const track = document.querySelector('.testi-track');
  if (!track) return;

  let scrollAmount = 0;
  const cardWidth = 340;

  setInterval(function () {
    scrollAmount += cardWidth;
    if (scrollAmount >= track.scrollWidth - track.clientWidth) {
      scrollAmount = 0;
    }
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 4000);
})();

// ─── Smooth anchor scrolling ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
