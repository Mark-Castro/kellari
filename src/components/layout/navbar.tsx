type NavItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  brand?: string;
  items?: NavItem[];
};

export default function Navbar({
  brand = 'Kellari',
  items = [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}: NavbarProps) {
  return (
    <header>
      <nav aria-label="Main navigation">
        <div>{brand}</div>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
