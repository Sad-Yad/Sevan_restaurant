import { useState } from 'react';
import { menuData, categories } from '../data/menuData';
import MenuItem from './MenuItem';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters');

  return (
    <section id="menu" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Our Offerings
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-charcoal mb-4">
            The Menu
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6"></div>
          <p className="text-muted text-base max-w-xl mx-auto">
            A curated selection of authentic Indian dishes, each prepared with
            time-honoured recipes and the freshest ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase rounded-sm transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gold text-white'
                  : 'bg-beige text-muted hover:text-charcoal hover:bg-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuData[activeCategory].map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

