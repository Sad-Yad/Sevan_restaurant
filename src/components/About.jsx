export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=720&h=540&fit=crop&q=80"
                alt="Fine dining experience"
                className="w-full h-80 lg:h-[28rem] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/10"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-charcoal mb-4">
              About Sevan
            </h2>
            <div className="w-16 h-px bg-gold mb-8"></div>

            <div className="space-y-5 text-muted leading-relaxed">
              <p>
                At Sevan, we believe that Indian cuisine is an art form — one
                that has been refined through centuries of culinary tradition.
                Our kitchen honours these heritage recipes while presenting
                them through the lens of contemporary fine dining.
              </p>
              <p>
                Every dish begins with the freshest ingredients, sourced
                thoughtfully and prepared with reverence for authenticity.
                From the smoky depths of our tandoor to the slow-simmered
                richness of our gravies, each plate is a testament to the
                depth and diversity of Indian flavours.
              </p>
              <p>
                We invite you to experience a dining journey where tradition
                and sophistication converge — where every meal is an occasion,
                and every flavour tells a story passed down through
                generations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: '25+', label: 'Signature Dishes' },
                { value: '10+', label: 'Years of Heritage' },
                { value: '100%', label: 'Authentic Recipes' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-2xl lg:text-3xl font-semibold text-gold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

