# Sevan — Premium Indian Cuisine Website

Your restaurant website is fully built and ready. Here's everything you need to know.

---

## Project Structure

```
AI_Assign_web/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Sticky navigation with cart badge
│   │   ├── Hero.jsx          ← Full-screen hero with tagline
│   │   ├── Menu.jsx          ← Category tabs + grid layout
│   │   ├── MenuItem.jsx      ← Individual dish card with add-to-cart
│   │   ├── Cart.jsx          ← Slide-out cart panel
│   │   ├── Checkout.jsx      ← Checkout form + demo payment + Google Sheets
│   │   ├── About.jsx         ← Restaurant story section
│   │   └── Footer.jsx        ← Contact info, hours, links
│   ├── context/
│   │   └── CartContext.jsx    ← Global cart state management
│   ├── data/
│   │   └── menuData.js       ← All 21 menu items (easily editable)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             ← Tailwind + custom theme
├── google-apps-script/
│   └── Code.gs               ← Google Sheets backend script
├── public/favicon.svg
├── index.html
├── vite.config.js
└── package.json
```

---

## Running the Website

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Google Sheets Integration — Setup

> [!IMPORTANT]
> You must deploy the Google Apps Script to connect orders to your spreadsheet.

### Step-by-step:

1. Open your Google Sheet:  
   [https://docs.google.com/spreadsheets/d/1ZIId-GQL0KQLKqNA5FF1BTMGScp-hBUpQBefB9WivDs](https://docs.google.com/spreadsheets/d/1ZIId-GQL0KQLKqNA5FF1BTMGScp-hBUpQBefB9WivDs)

2. Go to **Extensions → Apps Script**

3. Delete any existing code and paste the contents of [`google-apps-script/Code.gs`](file:///c:/Users/wwwsa/Documents/AI_Assign_web/google-apps-script/Code.gs)

4. Click **Deploy → New deployment**

5. Configure:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**

6. Click **Deploy**, authorize when prompted, and **copy the Web App URL**

7. Open [`src/components/Checkout.jsx`](file:///c:/Users/wwwsa/Documents/AI_Assign_web/src/components/Checkout.jsx) and replace the placeholder URL:
   ```js
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';
   ```
   with the URL you copied.

8. Rebuild / restart the dev server.

### Spreadsheet columns created automatically:

| Order ID | Order Date & Time | Customer Name | Phone Number | Ordered Items | Customizations | Quantity | Subtotals | Total Amount | Payment Method | Payment Status | Order Status |

---

## Key Features

| Feature | Details |
|---|---|
| **Menu** | 4 categories, 21 dishes with real Unsplash photos |
| **Cart** | Slide-out panel, quantity controls, running subtotal |
| **Checkout** | Name + phone validation, order summary |
| **Payment** | Cash or Online (demo UPI / Card / Net Banking interface) |
| **Google Sheets** | Auto-appends orders with unique Order ID |
| **Responsive** | Mobile, tablet, and desktop optimized |
| **Typography** | Cormorant Garamond headings + Inter body text |
| **Color palette** | Ivory, charcoal, muted grey, antique gold, beige |

---

## Editing Menu Items

All dishes are in [`src/data/menuData.js`](file:///c:/Users/wwwsa/Documents/AI_Assign_web/src/data/menuData.js). Each item follows this structure:

```js
{
  id: 's1',
  name: 'Paneer Tikka',
  description: '...',
  price: 280,              // ← Change price here
  veg: true,               // true = green indicator, false = red
  image: 'https://...',    // Unsplash / Pexels URL
  customizations: [
    { name: 'Spice Level', options: ['Mild', 'Medium', 'Hot'] },
  ],
}
```

> [!TIP]
> To add a new dish, just add another object to the appropriate category array. The grid layout adjusts automatically.

---

## Design Palette Reference

| Token | Color | Hex |
|---|---|---|
| `ivory` | Background | `#F7F5F0` |
| `charcoal` | Primary text | `#292823` |
| `muted` | Secondary text | `#77746C` |
| `gold` | Accent | `#A58A55` |
| `beige` | Secondary bg | `#EDE9DF` |
| `border` | Borders | `#DEDAD0` |

