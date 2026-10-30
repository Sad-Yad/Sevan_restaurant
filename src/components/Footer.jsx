export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-3xl font-semibold text-white mb-4">
              Sevan
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              An intimate celebration of India's culinary heritage, presented
              with elegance and served with warmth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '#home', label: 'Home' },
                { href: '#menu', label: 'Menu' },
                { href: '#about', label: 'About' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-gold mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex justify-between">
                <span>Monday – Friday</span>
                <span>12:00 – 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>11:00 – 23:30</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>11:00 – 22:00</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-gold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>42 Heritage Lane, Connaught Place,<br />New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>reservations@sevan.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Sevan — Premium Indian Cuisine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

