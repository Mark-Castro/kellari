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
import {
  getServiceHref,
  industryClusters,
  serviceCategories,
} from '../../lib/navigation';
import { THEME_STORAGE_KEY } from '../../lib/theme';

type MenuName = 'services' | 'industries';
type ServiceCategoryHref = (typeof serviceCategories)[number]['href'];
type IndustryClusterId = (typeof industryClusters)[number]['id'];
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
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1] as const,
};

const MotionLink = motion.create(Link);

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
  const reduceMotion = useReducedMotion();
  const [activeCategoryHref, setActiveCategoryHref] =
    useState<ServiceCategoryHref>(serviceCategories[0].href);
  const hoverIntentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCategory =
    serviceCategories.find(
      (category) => category.href === activeCategoryHref,
    ) ?? serviceCategories[0];

  useEffect(
    () => () => {
      if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    },
    [],
  );

  function previewCategory(href: ServiceCategoryHref) {
    if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    hoverIntentTimer.current = setTimeout(() => {
      setActiveCategoryHref(href);
      hoverIntentTimer.current = null;
    }, 70);
  }

  function cancelCategoryPreview() {
    if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    hoverIntentTimer.current = null;
  }

  return (
    <div className="mega-menu-inner services-menu-inner">
      <div className="mega-menu-intro">
        <p className="eyebrow">What we do</p>
        <h2>Expertise for what comes next.</h2>
        <p>
          Connected advice, built around the decisions that move your
          organization forward.
        </p>
        <Link className="mega-menu-cta-link group" href="/services" onClick={onNavigate}>
          <span className="mega-menu-cta-text">Explore all services</span>
          <motion.span
            aria-hidden="true"
            className="mega-menu-link-arrow transition-transform duration-200 group-hover:translate-x-1.5"
          >
            →
          </motion.span>
        </Link>
      </div>
      <div
        className="mega-menu-category-browser"
        onMouseLeave={cancelCategoryPreview}
      >
        <nav
          className="mega-menu-category-list"
          aria-label="Service categories"
        >
          {serviceCategories.map((category, index) => (
            <MotionLink
              className={`mega-menu-category-link${activeCategory.href === category.href ? ' is-active' : ''}`}
              href={category.href}
              key={category.href}
              onClick={onNavigate}
              onMouseLeave={(event) => {
                if (
                  event.relatedTarget instanceof Element &&
                  event.relatedTarget.closest('.mega-menu-category-link')
                ) {
                  cancelCategoryPreview();
                }
              }}
              onFocus={() => {
                cancelCategoryPreview();
                setActiveCategoryHref(category.href);
              }}
              onMouseEnter={() => previewCategory(category.href)}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              initial={false}
            >
              {activeCategory.href === category.href ? (
                <motion.span
                  aria-hidden="true"
                  className="mega-menu-category-highlight"
                  layoutId="services-pill"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 30 }
                  }
                >
                  <span />
                </motion.span>
              ) : null}
              <span className="mega-menu-category-index" aria-hidden="true">
                0{index + 1}
              </span>
              <motion.span
                animate={{ x: activeCategory.href === category.href ? 3 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 24 }
                }
              >
                {category.shortTitle}
              </motion.span>
              <motion.span
                aria-hidden="true"
                animate={{
                  x: activeCategory.href === category.href ? 5 : 0,
                  opacity: activeCategory.href === category.href ? 1 : 0.45,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 24 }
                }
              >
                →
              </motion.span>
            </MotionLink>
          ))}
        </nav>
        <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={activeCategory.href}
          className="mega-menu-submenu"
          id="mega-menu-category-submenu"
          aria-labelledby="mega-menu-category-submenu-heading"
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
        >
          <h3 id="mega-menu-category-submenu-heading">
            {activeCategory.shortTitle}
          </h3>
          <p>{activeCategory.description}</p>
          <ul>
            {activeCategory.services.map((service, serviceIndex) => (
              <motion.li
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.18,
                  delay: reduceMotion ? 0 : serviceIndex * 0.03,
                }}
              >
                <MotionLink
                  href={getServiceHref(service.title)}
                  onClick={onNavigate}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          borderColor: 'var(--nav-menu-feature-border)',
                        }
                  }
                >
                  {service.title} <span aria-hidden="true">↗</span>
                </MotionLink>
              </motion.li>
            ))}
          </ul>
          <Link
            className="mega-menu-submenu-overview group"
            href={activeCategory.href}
            onClick={onNavigate}
          >
            <span className="mega-menu-cta-text">
              View {activeCategory.shortTitle} overview
            </span>
            <motion.span
              aria-hidden="true"
              className="mega-menu-link-arrow transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </motion.span>
          </Link>
        </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

function IndustriesMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduceMotion = useReducedMotion();
  const [activeClusterId, setActiveClusterId] =
    useState<IndustryClusterId>(industryClusters[0].id);
  const hoverIntentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCluster =
    industryClusters.find((cluster) => cluster.id === activeClusterId) ??
    industryClusters[0];

  useEffect(
    () => () => {
      if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    },
    [],
  );

  function previewCluster(id: IndustryClusterId) {
    if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    hoverIntentTimer.current = setTimeout(() => {
      setActiveClusterId(id);
      hoverIntentTimer.current = null;
    }, 70);
  }

  function cancelClusterPreview() {
    if (hoverIntentTimer.current) clearTimeout(hoverIntentTimer.current);
    hoverIntentTimer.current = null;
  }

  return (
    <div className="mega-menu-inner industries-menu-inner">
      <div className="mega-menu-intro">
        <p className="eyebrow">Who we work with</p>
        <h2>Insight across connected sectors.</h2>
        <p>
          Sector-aware perspectives help turn complex challenges into practical
          progress.
        </p>
        <Link className="mega-menu-cta-link group" href="/industries" onClick={onNavigate}>
          <span className="mega-menu-cta-text">Explore all industries</span>
          <motion.span
            aria-hidden="true"
            className="mega-menu-link-arrow transition-transform duration-200 group-hover:translate-x-1.5"
          >
            →
          </motion.span>
        </Link>
      </div>
      <div
        className="mega-menu-category-browser"
        onMouseLeave={cancelClusterPreview}
      >
        <nav
          className="mega-menu-category-list"
          aria-label="Industry clusters"
        >
          {industryClusters.map((cluster, index) => (
            <MotionLink
              className={`mega-menu-category-link${activeCluster.id === cluster.id ? ' is-active' : ''}`}
              href={`/industries#${cluster.id}`}
              key={cluster.id}
              onClick={onNavigate}
              onMouseLeave={(event) => {
                if (
                  event.relatedTarget instanceof Element &&
                  event.relatedTarget.closest('.mega-menu-category-link')
                ) {
                  cancelClusterPreview();
                }
              }}
              onFocus={() => {
                cancelClusterPreview();
                setActiveClusterId(cluster.id);
              }}
              onMouseEnter={() => previewCluster(cluster.id)}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              initial={false}
            >
              {activeCluster.id === cluster.id ? (
                <motion.span
                  aria-hidden="true"
                  className="mega-menu-category-highlight"
                  layoutId="industries-pill"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 30 }
                  }
                >
                  <span />
                </motion.span>
              ) : null}
              <span className="mega-menu-category-index" aria-hidden="true">
                0{index + 1}
              </span>
              <motion.span
                animate={{ x: activeCluster.id === cluster.id ? 3 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 24 }
                }
              >
                {cluster.title}
              </motion.span>
              <motion.span
                aria-hidden="true"
                animate={{
                  x: activeCluster.id === cluster.id ? 5 : 0,
                  opacity: activeCluster.id === cluster.id ? 1 : 0.45,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 24 }
                }
              >
                →
              </motion.span>
            </MotionLink>
          ))}
        </nav>
        <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={activeCluster.id}
          className="mega-menu-submenu"
          id="mega-menu-category-submenu"
          aria-labelledby="mega-menu-category-submenu-heading"
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
        >
          <h3 id="mega-menu-category-submenu-heading">
            {activeCluster.title}
          </h3>
          <p>{activeCluster.description}</p>
          <ul>
            {activeCluster.industries.map((industry, industryIndex) => (
              <motion.li
                key={industry.id}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.18,
                  delay: reduceMotion ? 0 : industryIndex * 0.03,
                }}
              >
                <MotionLink
                  href={`/industries/${industry.id}`}
                  onClick={onNavigate}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          borderColor: 'var(--nav-menu-feature-border)',
                        }
                  }
                >
                  {industry.title} <span aria-hidden="true">↗</span>
                </MotionLink>
              </motion.li>
            ))}
          </ul>
          <Link
            className="mega-menu-submenu-overview group"
            href={`/industries#${activeCluster.id}`}
            onClick={onNavigate}
          >
            <span className="mega-menu-cta-text">
              View {activeCluster.title} cluster
            </span>
            <motion.span
              aria-hidden="true"
              className="mega-menu-link-arrow transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </motion.span>
          </Link>
        </motion.section>
        </AnimatePresence>
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
          prefetch={true}
          aria-label="KELARI GROUP LLC home"
          onClick={(event) => {
            closeNavigation();
            if (
              pathname === '/' &&
              event.button === 0 &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }}
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
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 350, damping: 25 }
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
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: -8, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -6, scale: 0.985 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
            }
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
                                                className="mobile-navigation-link"
                                                href={category.href}
                                              key={category.href}
                                                onClick={closeNavigation}
                                            >
                                                {category.shortTitle}
                                              </Link>
                                          ))
                                        : industryClusters.map((cluster) => (
                                              <Link
                                                className="mobile-navigation-link"
                                                href={`/industries#${cluster.id}`}
                                              key={cluster.id}
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
