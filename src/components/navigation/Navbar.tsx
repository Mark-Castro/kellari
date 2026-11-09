'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { contactPhoneLink } from '../../lib/contact';
import { industryClusters, serviceCategories } from '../../lib/navigation';
import { THEME_STORAGE_KEY } from '../../lib/theme';

type MenuName = 'services' | 'industries';
type NavigationItem = {
  label: string;
  href?: string;
  menu?: MenuName;
};

const navigationItems: NavigationItem[] = [
  { label: 'Services', menu: 'services' },
  { label: 'Industries', menu: 'industries' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

const menuTransition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 30,
};

const dropdownTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      type="button"
      role="switch"
      aria-label="Dark mode"
      aria-checked={isDark}
      onClick={onToggle}
    >
      <span className="theme-toggle-label">Dark mode</span>
      <span className="theme-toggle-label-compact" aria-hidden="true">
        Dark
      </span>
      <span className="theme-toggle-track" aria-hidden="true" />
    </button>
  );
}

function ServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mega-menu-inner services-menu-inner">
      <div className="mega-menu-intro">
        <p className="eyebrow">What we do</p>
        <h2>Expertise for what comes next.</h2>
        <p>
          Connected advice, built around the decisions that move your
          organization forward.
        </p>
        <Link href="/services" onClick={onNavigate}>
          Explore all services <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mega-menu-grid services-menu-grid">
        {serviceCategories.map((category, index) => (
          <section className="mega-menu-group" key={category.href}>
            <span className="mega-menu-index" aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className="mega-menu-heading">{category.shortTitle}</h3>
            <p className="mega-menu-description">{category.description}</p>
            <ul>
              {category.services.slice(0, 4).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
            <Link
              className="mega-menu-card-link"
              href={category.href}
              onClick={onNavigate}
            >
              View service area <span aria-hidden="true">↗</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}

function IndustriesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mega-menu-inner industries-menu-inner">
      <div className="mega-menu-intro">
        <p className="eyebrow">Who we work with</p>
        <h2>Insight across connected sectors.</h2>
        <p>
          Sector-aware perspectives help turn complex challenges into practical
          progress.
        </p>
        <Link href="/industries" onClick={onNavigate}>
          Explore all industries <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mega-menu-grid industries-menu-grid">
        {industryClusters.map((cluster, index) => (
          <section className="mega-menu-group" key={cluster.id}>
            <span className="mega-menu-index" aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className="mega-menu-heading">{cluster.title}</h3>
            <p className="mega-menu-description">{cluster.description}</p>
            <ul>
              {cluster.industries.map((industry) => (
                <li key={industry.id}>{industry.title}</li>
              ))}
            </ul>
            <Link
              className="mega-menu-card-link"
              href={`/industries#${cluster.id}`}
              onClick={onNavigate}
            >
              View industry area <span aria-hidden="true">↗</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const menuButtonRefs = useRef<
    Partial<Record<MenuName, HTMLButtonElement | null>>
  >({});
  const lastScrollY = useRef(0);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function syncThemeWithSystem(event?: MediaQueryListEvent) {
      if (root.dataset.theme) {
        setIsDarkTheme(root.dataset.theme === 'dark');
      } else {
        setIsDarkTheme(event?.matches ?? colorScheme.matches);
      }
    }

    syncThemeWithSystem();
    colorScheme.addEventListener('change', syncThemeWithSystem);
    return () => colorScheme.removeEventListener('change', syncThemeWithSystem);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer?.querySelector<HTMLElement>(focusableSelector)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        setActiveMenu(null);
        mobileToggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !drawer) return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || mobileOpen || !activeMenu) return;
      event.preventDefault();
      setActiveMenu(null);
      menuButtonRefs.current[activeMenu]?.focus();
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        activeMenu &&
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target) &&
        !drawerRef.current?.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (activeMenu && currentScrollY > lastScrollY.current + 2) {
        setActiveMenu(null);
      }
      lastScrollY.current = currentScrollY;
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeMenu, mobileOpen]);

  function closeNavigation() {
    setActiveMenu(null);
    setHoveredItem(null);
    setMobileOpen(false);
  }

  function toggleMenu(menu: MenuName) {
    setActiveMenu((current) => (current === menu ? null : menu));
  }

  function toggleTheme() {
    const nextTheme = isDarkTheme ? 'light' : 'dark';

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error('Unable to save the theme preference.', error);
    }

    document.documentElement.dataset.theme = nextTheme;
    setIsDarkTheme(nextTheme === 'dark');
  }

  function handleNavigationFocus(event: FocusEvent<HTMLElement>) {
    const target = event.target.closest<HTMLElement>('[data-nav-label]');
    if (target) setHoveredItem(target.dataset.navLabel ?? null);
  }

  function handleNavigationBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHoveredItem(null);
    }
  }

  function handleNavigationPointerLeave(event: MouseEvent<HTMLElement>) {
    if (!(event.currentTarget.contains(document.activeElement))) {
      setHoveredItem(null);
    }
  }

  const activeIndicator =
    hoveredItem ??
    (activeMenu === 'services'
      ? 'Services'
      : activeMenu === 'industries'
        ? 'Industries'
        : navigationItems.find(
              (item) => item.href && pathname.startsWith(item.href),
            )?.label ?? null);

  return (
    <>
    <header
      className="site-header"
      data-theme={isDarkTheme ? 'dark' : 'light'}
      ref={headerRef}
      onMouseLeave={() => {
        if (!activeMenu) setHoveredItem(null);
      }}
    >
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="KELARI GROUP LLC home"
          onClick={closeNavigation}
        >
          <span className="brand-mark" aria-hidden="true">
            K
          </span>
          <span>KELARI GROUP LLC</span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          <ul
            className="primary-navigation"
            onFocusCapture={handleNavigationFocus}
            onBlurCapture={handleNavigationBlur}
            onMouseLeave={handleNavigationPointerLeave}
          >
            {navigationItems.map((item) => {
              const isSelected =
                activeIndicator === item.label ||
                (item.menu !== undefined && activeMenu === item.menu);
              const indicator = isSelected ? (
                <motion.span
                  className="navigation-active-pill"
                  layoutId="activeNavPill"
                  transition={
                    reduceMotion ? { duration: 0 } : menuTransition
                  }
                />
              ) : null;

              return (
                <li key={item.label}>
                  {item.menu ? (
                    <button
                      ref={(element) => {
                        menuButtonRefs.current[item.menu!] = element;
                      }}
                      id={`${item.menu}-menu-trigger`}
                      className={`navigation-trigger${isSelected ? ' is-active' : ''}`}
                      type="button"
                      data-nav-label={item.label}
                      aria-expanded={activeMenu === item.menu}
                      aria-controls={`${item.menu}-mega-menu`}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onFocus={() => setHoveredItem(item.label)}
                      onClick={() => toggleMenu(item.menu!)}
                    >
                      {indicator}
                      <span className="navigation-label">{item.label}</span>
                      <motion.span
                        className="navigation-chevron"
                        aria-hidden="true"
                        animate={{
                          rotate: activeMenu === item.menu ? 180 : 0,
                        }}
                        transition={
                          reduceMotion ? { duration: 0 } : menuTransition
                        }
                      >
                        ▾
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      className={`navigation-link${isSelected ? ' is-active' : ''}`}
                      href={item.href!}
                      data-nav-label={item.label}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onFocus={() => setHoveredItem(item.label)}
                      onClick={closeNavigation}
                      aria-current={
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                          ? 'page'
                          : undefined
                      }
                    >
                      {indicator}
                      <span className="navigation-label">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
          {contactPhoneLink ? (
            <a className="header-call-link" href={contactPhoneLink}>
              Call
            </a>
          ) : null}
          <Link className="header-cta" href="/contact" onClick={closeNavigation}>
            Contact us <span aria-hidden="true">→</span>
          </Link>
          <button
            ref={mobileToggleRef}
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-dialog"
            onClick={() => {
              setActiveMenu(null);
              setMobileOpen((open) => !open);
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {activeMenu ? (
          <motion.div
            key={activeMenu}
            className="mega-menu"
            id={`${activeMenu}-mega-menu`}
            role="region"
            aria-label={
              activeMenu === 'services' ? 'Services menu' : 'Industries menu'
            }
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : dropdownTransition}
          >
            <div className="mega-menu-content">
              {activeMenu === 'services' ? (
                <ServicesMenu onNavigate={closeNavigation} />
              ) : (
                <IndustriesMenu onNavigate={closeNavigation} />
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
    {typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                className="mobile-navigation-layer"
                data-theme={isDarkTheme ? 'dark' : 'light'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                <motion.button
                  className="mobile-navigation-backdrop"
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeNavigation}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.2 }
                  }
                />
                <motion.div
                  className="mobile-navigation-dialog"
                  id="mobile-navigation-dialog"
                  ref={drawerRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  initial={{ opacity: 0, x: '1rem' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '1rem' }}
                  transition={
                    reduceMotion ? { duration: 0 } : dropdownTransition
                  }
                >
                    <div className="mobile-navigation-heading">
                      <span>Explore Kelari Group</span>
                      <button
                        className="mobile-close-button"
                        type="button"
                        onClick={closeNavigation}
                      >
                        Close <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <nav aria-label="Mobile navigation">
                      <ul className="mobile-primary-navigation">
                        {navigationItems.map((item) => (
                          <li key={item.label}>
                            {item.menu ? (
                              <>
                                <button
                                  className="mobile-navigation-trigger"
                                  type="button"
                                  aria-expanded={activeMenu === item.menu}
                                  aria-controls={`mobile-${item.menu}-links`}
                                  onClick={() => toggleMenu(item.menu!)}
                                >
                                  {item.label}
                                  <span className="chevron" aria-hidden="true" />
                                </button>
                                <AnimatePresence initial={false}>
                                  {activeMenu === item.menu ? (
                                    <motion.div
                                      className="mobile-submenu"
                                      id={`mobile-${item.menu}-links`}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={
                                        reduceMotion
                                          ? { duration: 0 }
                                          : dropdownTransition
                                      }
                                    >
                                      {item.menu === 'services'
                                        ? serviceCategories.map((category) => (
                                            <Link
                                              key={category.href}
                                              href={category.href}
                                              onClick={closeNavigation}
                                            >
                                              {category.shortTitle}
                                            </Link>
                                          ))
                                        : industryClusters.map((cluster) => (
                                            <Link
                                              key={cluster.id}
                                              href={`/industries#${cluster.id}`}
                                              onClick={closeNavigation}
                                            >
                                              {cluster.title}
                                            </Link>
                                          ))}
                                      <Link
                                        href={
                                          item.menu === 'services'
                                            ? '/services'
                                            : '/industries'
                                        }
                                        onClick={closeNavigation}
                                      >
                                        Explore all {item.label.toLowerCase()}
                                      </Link>
                                    </motion.div>
                                  ) : null}
                                </AnimatePresence>
                              </>
                            ) : (
                              <Link
                                className="mobile-navigation-link"
                                href={item.href!}
                                onClick={closeNavigation}
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                      <Link
                        className="mobile-navigation-cta"
                        href="/contact"
                        onClick={closeNavigation}
                      >
                        Contact us <span aria-hidden="true">→</span>
                      </Link>
                    </nav>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null}
    </>
  );
}
