'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { industryClusters, serviceCategories } from '../../lib/navigation';

type MenuName = 'services' | 'industries';

const primaryLinks = [
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const menuButtonRefs = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});

  useEffect(() => {
    if (!mobileOpen) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const drawer = drawerRef.current;
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
    return () => document.removeEventListener('keydown', handleKeyDown);
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
        !headerRef.current?.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activeMenu, mobileOpen]);

  function closeMobileNavigation() {
    setMobileOpen(false);
    setActiveMenu(null);
  }

  function toggleMenu(menu: MenuName) {
    setActiveMenu((current) => (current === menu ? null : menu));
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Kellari home"
          onClick={closeMobileNavigation}
        >
          <span className="brand-mark" aria-hidden="true">
            K
          </span>
          <span>Kellari</span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          <ul className="primary-navigation">
            <li>
              <button
                ref={(element) => {
                  menuButtonRefs.current.services = element;
                }}
                className="navigation-trigger"
                type="button"
                aria-expanded={activeMenu === 'services'}
                aria-controls="services-mega-menu"
                onClick={() => toggleMenu('services')}
              >
                Services <span className="chevron" aria-hidden="true" />
              </button>
            </li>
            <li>
              <button
                ref={(element) => {
                  menuButtonRefs.current.industries = element;
                }}
                className="navigation-trigger"
                type="button"
                aria-expanded={activeMenu === 'industries'}
                aria-controls="industries-mega-menu"
                onClick={() => toggleMenu('industries')}
              >
                Industries <span className="chevron" aria-hidden="true" />
              </button>
            </li>
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link className="navigation-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="header-cta" href="/contact">
            Contact us
          </Link>
        </nav>

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

      {activeMenu && (
        <div
          className="mega-menu"
          id={`${activeMenu}-mega-menu`}
          aria-label={activeMenu === 'services' ? 'Services menu' : 'Industries menu'}
        >
          <div className="mega-menu-inner">
            {activeMenu === 'services' ? (
              <>
                <div className="mega-menu-intro">
                  <p className="eyebrow">What we do</p>
                  <h2>Expertise for what comes next.</h2>
                  <Link href="/services" onClick={() => setActiveMenu(null)}>
                    Explore all services <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="mega-menu-grid services-menu-grid">
                  {serviceCategories.map((category) => (
                    <section className="mega-menu-group" key={category.href}>
                      <Link
                        className="mega-menu-heading"
                        href={category.href}
                        onClick={() => setActiveMenu(null)}
                      >
                        {category.shortTitle}
                      </Link>
                      <p className="mega-menu-description">{category.title}</p>
                      <ul>
                        {category.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mega-menu-intro">
                  <p className="eyebrow">Who we work with</p>
                  <h2>Insight across connected sectors.</h2>
                  <Link href="/industries" onClick={() => setActiveMenu(null)}>
                    Explore all industries <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="mega-menu-grid industries-menu-grid">
                  {industryClusters.map((cluster) => (
                    <section className="mega-menu-group" key={cluster.id}>
                      <Link
                        className="mega-menu-heading"
                        href={`/industries#${cluster.id}`}
                        onClick={() => setActiveMenu(null)}
                      >
                        {cluster.title}
                      </Link>
                      <ul>
                        {cluster.industries.map((industry) => (
                          <li key={industry.id}>
                            <Link
                              href={`/industries#${industry.id}`}
                              onClick={() => setActiveMenu(null)}
                            >
                              {industry.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <>
          <button
            className="mobile-navigation-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileNavigation}
          />
          <div
            className="mobile-navigation-dialog"
            id="mobile-navigation-dialog"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="mobile-navigation-heading">
              <span>Explore Kellari</span>
              <button
                className="mobile-close-button"
                type="button"
                onClick={closeMobileNavigation}
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul className="mobile-primary-navigation">
                {(['services', 'industries'] as const).map((menu) => (
                  <li key={menu}>
                    <button
                      className="mobile-navigation-trigger"
                      type="button"
                      aria-expanded={activeMenu === menu}
                      aria-controls={`mobile-${menu}-links`}
                      onClick={() => toggleMenu(menu)}
                    >
                      {menu === 'services' ? 'Services' : 'Industries'}
                      <span className="chevron" aria-hidden="true" />
                    </button>
                    {activeMenu === menu && (
                      <div className="mobile-submenu" id={`mobile-${menu}-links`}>
                        {menu === 'services' ? (
                          <>
                            {serviceCategories.map((category) => (
                              <Link
                                key={category.href}
                                href={category.href}
                                onClick={closeMobileNavigation}
                              >
                                {category.shortTitle}
                              </Link>
                            ))}
                            <Link href="/services" onClick={closeMobileNavigation}>
                              All services
                            </Link>
                          </>
                        ) : (
                          <>
                            {industryClusters.map((cluster) => (
                              <Link
                                key={cluster.id}
                                href={`/industries#${cluster.id}`}
                                onClick={closeMobileNavigation}
                              >
                                {cluster.title}
                              </Link>
                            ))}
                            <Link href="/industries" onClick={closeMobileNavigation}>
                              All industries
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
                {primaryLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="mobile-navigation-link"
                      href={item.href}
                      onClick={closeMobileNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="mobile-navigation-cta"
                    href="/contact"
                    onClick={closeMobileNavigation}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
