

# Beauty Salon Website — "Serene Beauty"

A modern, minimal beauty & wellness salon frontend with clean lines, muted earth tones, ample whitespace, and elegant animations.

---

## Color Palette & Design
- **Muted, earthy minimalism**: warm beige/cream backgrounds, soft charcoal text, muted sage green accents, subtle warm taupe for cards and borders
- **Typography**: Clean sans-serif with a refined serif for headings
- **Animations**: Typewriter effect on hero headlines, smooth fade-in/slide-up on scroll for sections, hover scale effects on service cards, subtle parallax on hero images

---

## Pages

### 1. Home
- Full-width hero with a beauty salon image, typewriter-animated headline, and CTA button ("Book Now")
- Featured services section (4 cards with icons/images)
- Testimonials carousel
- "Why Choose Us" highlights section
- Footer with links, social icons, and contact info

### 2. About
- Salon story section with image
- Team/stylists grid with photos, names, and specialties
- Salon values/philosophy section

### 3. Services
- Categorized service listing: Hair, Nails, Skin, Massage & Wellness
- Each service card shows name, description, duration, and price
- Filter/tab navigation by category

### 4. Booking (Step-by-Step Wizard)
- **Step 1**: Choose a service category → specific service
- **Step 2**: Select a stylist/therapist
- **Step 3**: Pick date and time slot
- **Step 4**: Enter your details (name, phone, email)
- **Step 5**: Review & confirm summary
- All client-side with a success confirmation screen

### 5. Contact
- Contact form (name, email, phone, message)
- Salon address, phone, email, and hours displayed
- Embedded map placeholder
- Social media links

### 6. Login
- Email and password form
- "Forgot password" link
- Link to Sign Up page
- Client-side only (mock authentication)

### 7. Sign Up
- Name, email, password, confirm password form
- Link to Login page
- Client-side only (stores to local state)

### 8. Profile
- Display user info (name, email)
- Mock booking history list
- Edit profile form
- Logout button

---

## Data & Assets
- **`data.json`**: Contains all salon data — services with prices/durations, team members, testimonials, working hours, booking time slots, mock user profile, and booking history
- **Images**: Fetched from Unsplash using direct URLs for salon, hair, nails, skincare, and massage imagery

---

## Shared Components
- **Navbar**: Sticky top navigation with logo, page links, and login/signup buttons; mobile hamburger menu
- **Footer**: Contact info, quick links, social icons, newsletter signup field
- **Typewriter component**: Reusable animated text for hero sections
- **Scroll animations**: Fade-in-on-scroll wrapper for all major sections

