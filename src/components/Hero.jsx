export default function Hero() {
  const handleExploreMenu = (e) => {
    e.preventDefault();
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=80"
          alt="Restaurant ambience"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-charcoal/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Decorative line */}
        <div className="w-16 h-px bg-gold mx-auto mb-8"></div>

        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-wide mb-4">
          Sevan
        </h1>

        <p className="font-heading text-xl sm:text-2xl text-gold italic mb-6 tracking-wide">
          Where Tradition Meets Refinement
        </p>

        <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Experience the timeless art of Indian cuisine, crafted with
          heritage recipes, the finest ingredients, and an unwavering
          commitment to authenticity. Every dish tells a story of tradition
          perfected over generations.
        </p>

        <a
          href="#menu"
          onClick={handleExploreMenu}
          className="inline-block px-10 py-3.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 rounded-sm"
        >
          Explore Menu
        </a>

        {/* Decorative line */}
        <div className="w-16 h-px bg-gold mx-auto mt-12"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

