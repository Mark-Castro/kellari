type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  columns?: Array<{ title: string; links: FooterLink[] }>;
};

export default function Footer({
  columns = [
    { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '/careers' }] },
    { title: 'Services', links: [{ label: 'Strategy', href: '/services/strategy-people-digital' }, { label: 'Insights', href: '/insights' }] },
    { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms of Service', href: '/terms-of-service' }] },
  ],
}: FooterProps) {
  return (
    <footer>
      <div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p>© 2026 Kellari</p>
    </footer>
  );
}
