(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  const navLinks = navigation ? navigation.querySelectorAll('a') : [];
  const backdrop = document.querySelector('[data-dialog-backdrop]');
  const openProjectButton = document.querySelector('[data-open-project]');
  const closeDialogButton = document.querySelector('[data-close-dialog]');
  const dialog = backdrop ? backdrop.querySelector('[role="dialog"]') : null;
  let previousFocus = null;

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
    navigation.classList.remove('is-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
      navigation.classList.toggle('is-open', !isOpen);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const openDialog = () => {
    if (!backdrop || !dialog) return;
    previousFocus = document.activeElement;
    backdrop.hidden = false;
    document.body.classList.add('dialog-open');
    requestAnimationFrame(() => backdrop.classList.add('is-open'));
    closeDialogButton.focus();
  };

  const closeDialog = () => {
    if (!backdrop || backdrop.hidden) return;
    backdrop.classList.remove('is-open');
    document.body.classList.remove('dialog-open');
    window.setTimeout(() => {
      backdrop.hidden = true;
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }, 210);
  };

  if (openProjectButton) openProjectButton.addEventListener('click', openDialog);
  if (closeDialogButton) closeDialogButton.addEventListener('click', closeDialog);
  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeDialog();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (!backdrop || backdrop.hidden) return;
    if (event.key === 'Escape') {
      closeDialog();
      return;
    }
    if (event.key === 'Tab' && dialog) {
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const current = navigation && navigation.querySelector(`a[href="#${entry.target.id}"]`);
        navLinks.forEach((link) => link.removeAttribute('aria-current'));
        if (current) current.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
