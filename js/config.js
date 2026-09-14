/* ======================================================================
   CLEANARK — SITE CONFIG
   ======================================================================
   This is the ONE file you edit to update content across the ENTIRE
   website. Every page (index.html, services.html, pricing.html,
   about.html, contact.html) loads this file and pulls its text from it.

   Change a phone number here -> it updates in the header, footer,
   contact page and the WhatsApp button on every single page.
   Add a service here -> it shows up on the homepage preview AND the
   full services page automatically.

   Look for "PLACEHOLDER" comments — those are the values you should
   replace with your real business details. Everything else (labels,
   layout, wording) is safe to tweak too, just keep the structure
   (the { }, [ ], quotes and commas) the same shape.
   ====================================================================== */

const SITE = {

  /* ---------------------------------------------------------------
     BUSINESS IDENTITY
  --------------------------------------------------------------- */
  business: {
    name: "CleanArk",
    tagline: "Cleaning Beyond Expectations",
    logo: "images/logo.png",       // header/footer logo
    favicon: "images/favicon-32.png",
    city: "Noida",
    metaDescription: "CleanArk is a premium laundry & dry-cleaning service in Noida — free pickup & delivery, wash & fold, dry cleaning and steam pressing."
  },

  /* ---------------------------------------------------------------
     CONTACT DETAILS — PLACEHOLDER: replace with your real details.
     These fill every "data-bind" spot across the whole site, plus
     the WhatsApp button and the tel:/mailto: links.
  --------------------------------------------------------------- */
  contact: {
    phoneDisplay: "+91 90000 00000",     // PLACEHOLDER — shown to users
    phoneLink: "+919000000000",          // PLACEHOLDER — digits only, used in tel: links
    whatsappNumber: "919000000000",      // PLACEHOLDER — country code + number, no + or spaces
    whatsappDefaultMessage: "Hi CleanArk! I'd like to book a laundry pickup.",
    email: "hello@cleanark.example",     // PLACEHOLDER
    addressLine1: "[Shop / Unit No., Building Name]",   // PLACEHOLDER
    addressLine2: "[Sector], Noida, Uttar Pradesh, [PIN CODE]", // PLACEHOLDER
    mapEmbedUrl: "https://www.google.com/maps?q=Noida,Uttar+Pradesh&output=embed", // PLACEHOLDER — replace with your exact location's embed link
    hours: [
      { day: "Monday – Saturday", time: "8:00 AM – 9:00 PM" },
      { day: "Sunday", time: "9:00 AM – 6:00 PM" }
    ]
  },

  /* ---------------------------------------------------------------
     SOCIAL LINKS — PLACEHOLDER: replace "#" with real profile URLs.
     Leave a value as "#" and the icon just won't link anywhere yet.
  --------------------------------------------------------------- */
  social: {
    instagram: "#",
    facebook: "#",
    whatsappShare: "#"
  },

  /* ---------------------------------------------------------------
     MAIN NAVIGATION — edit label/link/order here, it updates the
     header AND footer nav on every page.
  --------------------------------------------------------------- */
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ],

  /* ---------------------------------------------------------------
     SERVICES — add/remove/edit entries and they'll appear on the
     homepage (short preview) and services.html (full list)
     automatically. "icon" is just an emoji — swap it for any emoji
     you like, no image files needed.
  --------------------------------------------------------------- */
  services: [
    {
      id: "wash-fold",
      icon: "🧺",
      imageKey: "washFold",
      title: "Wash & Fold",
      short: "Everyday laundry — washed, dried and neatly folded.",
      description: "Send us your everyday laundry — shirts, tees, bedsheets, towels and more. We wash with quality detergents, dry, fold neatly and pack it ready for your wardrobe. Priced per kg, picked up and delivered to your door.",
      turnaround: "24–48 hrs",
      priceFrom: "₹59/kg"
    },
    {
      id: "wash-iron",
      icon: "👔",
      imageKey: "towels",
      title: "Wash & Iron",
      short: "Everyday laundry, washed and crisply pressed.",
      description: "Same care as Wash & Fold, finished with a crisp steam-iron press so every piece comes back ready to wear — no ironing board required at home.",
      turnaround: "24–48 hrs",
      priceFrom: "₹79/kg"
    },
    {
      id: "dry-cleaning",
      icon: "🧥",
      imageKey: "dryClean",
      title: "Dry Cleaning",
      short: "Safe, gentle cleaning for suits, sarees & delicates.",
      description: "Suits, blazers, sarees, sherwanis, curtains and delicate fabrics need special care. Our dry-cleaning process removes stains and odours without damaging fabric, colour or embellishments.",
      turnaround: "48–72 hrs",
      priceFrom: "₹129/piece"
    },
    {
      id: "steam-press",
      icon: "🔥",
      imageKey: "steamPress",
      title: "Steam Ironing / Pressing",
      short: "Quick, sharp pressing for clothes you already own.",
      description: "Already clean but creased? Our steam-pressing service gives your clothes a sharp, fresh finish fast — perfect for last-minute meetings, events or travel.",
      turnaround: "Same day / 24 hrs",
      priceFrom: "₹19/piece"
    }
  ],

  /* ---------------------------------------------------------------
     WHY CHOOSE US — homepage feature grid
  --------------------------------------------------------------- */
  features: [
    { icon: "🚲", title: "Free Pickup & Delivery", text: "We collect and drop off at your doorstep anywhere in our Noida service area, at no extra cost." },
    { icon: "⏱️", title: "On-Time, Every Time", text: "Clear turnaround windows on every order, tracked from pickup to delivery." },
    { icon: "🌿", title: "Fabric-Safe Process", text: "Detergents and techniques chosen by fabric type, so colours and textures stay intact." },
    { icon: "💳", title: "Simple, Transparent Pricing", text: "No hidden charges — know the price before you book." }
  ],

  /* ---------------------------------------------------------------
     HOW IT WORKS — homepage steps
  --------------------------------------------------------------- */
  steps: [
    { number: "01", title: "Book a Pickup", text: "Request a pickup slot online or on WhatsApp — takes less than a minute." },
    { number: "02", title: "We Collect", text: "Our team picks up your laundry from your doorstep at the scheduled time." },
    { number: "03", title: "We Clean", text: "Your clothes are sorted, cleaned and finished with care at our facility." },
    { number: "04", title: "We Deliver", text: "Fresh, folded or pressed laundry delivered back to your door." }
  ],

  /* ---------------------------------------------------------------
     SERVICE AREA — Noida sectors currently covered.
     PLACEHOLDER: adjust this list to your real coverage area.
  --------------------------------------------------------------- */
  serviceAreas: [
    "Sector 15", "Sector 18", "Sector 26", "Sector 37", "Sector 44",
    "Sector 50", "Sector 62", "Sector 76", "Sector 93", "Sector 137"
  ],

  /* ---------------------------------------------------------------
     PRICING TABLE — shown on pricing.html
  --------------------------------------------------------------- */
  pricing: {
    note: "Prices below are sample starting rates — PLACEHOLDER, update with your real price list.",
    categories: [
      {
        name: "Wash & Fold (per kg, min. 4kg)",
        items: [
          { item: "Regular Wash & Fold", price: "₹59/kg" },
          { item: "Wash & Fold (Express, same-day)", price: "₹89/kg" }
        ]
      },
      {
        name: "Wash & Iron (per kg, min. 4kg)",
        items: [
          { item: "Regular Wash & Iron", price: "₹79/kg" },
          { item: "Wash & Iron (Express, same-day)", price: "₹109/kg" }
        ]
      },
      {
        name: "Dry Cleaning (per piece)",
        items: [
          { item: "Shirt / T-shirt", price: "₹99" },
          { item: "Trousers / Jeans", price: "₹129" },
          { item: "Suit (2-piece)", price: "₹349" },
          { item: "Saree (plain)", price: "₹199" },
          { item: "Saree (heavy work)", price: "₹349+" },
          { item: "Sherwani / Lehenga", price: "₹499+" },
          { item: "Curtain (per panel)", price: "₹149" }
        ]
      },
      {
        name: "Steam Pressing (per piece)",
        items: [
          { item: "Shirt / T-shirt", price: "₹19" },
          { item: "Trousers / Kurta", price: "₹25" },
          { item: "Saree", price: "₹49" }
        ]
      }
    ]
  },

  /* ---------------------------------------------------------------
     TESTIMONIALS — sample/placeholder quotes. Replace with real
     customer reviews once you have them (name + area is enough).
  --------------------------------------------------------------- */
  testimonials: [
    { quote: "Pickup was on time and my shirts came back perfectly pressed. Great value for the price.", name: "Ananya S.", area: "Sector 50, Noida" },
    { quote: "I use CleanArk for my sarees before every event — always spotless and delivered on schedule.", name: "Rina M.", area: "Sector 62, Noida" },
    { quote: "Easy to book on WhatsApp and the wash & fold service saves me hours every week.", name: "Karan V.", area: "Sector 137, Noida" }
  ],

  /* ---------------------------------------------------------------
     STATS — shown on the About page
  --------------------------------------------------------------- */
  stats: [
    { number: "10,000+", label: "Orders Delivered" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "10+", label: "Sectors Covered" },
    { number: "24–48 hrs", label: "Typical Turnaround" }
  ],

  /* ---------------------------------------------------------------
     IMAGES — free-to-use stock photos (Unsplash), swap the URLs
     for your own real studio/team/work photos whenever you have
     them. Keep the same variable names so the pages don't break.
  --------------------------------------------------------------- */
  images: {
    heroHome: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1400&q=80",
    heroServices: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1400&q=80",
    heroPricing: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&w=1400&q=80",
    heroAbout: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1400&q=80",
    heroContact: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1400&q=80",
    washFold: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?auto=format&fit=crop&w=800&q=80",
    dryClean: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    steamPress: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    ourTeam: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&w=800&q=80",
    facility: "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?auto=format&fit=crop&w=800&q=80",
    towels: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?auto=format&fit=crop&w=800&q=80",
    aboutStory: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&w=800&q=80"
  }
};
