import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const properties = [
  {
    id: 1,
    name: 'Luxury Downtown Penthouse',
    location: 'Downtown, New York',
    daily_price: 150,
    monthly_price: 3500,
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    description:
      'A premium penthouse with city skyline views and modern amenities.'
  },
  {
    id: 2,
    name: 'Cozy Suburban House',
    location: 'Suburbs, California',
    daily_price: 80,
    monthly_price: 2000,
    bedrooms: 4,
    bathrooms: 3,
    size: 2200,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    description:
      'Comfortable suburban home ideal for families looking for space and peace.'
  },
  {
    id: 3,
    name: 'Beachfront Villa',
    location: 'Miami Beach, Florida',
    daily_price: 300,
    monthly_price: 7500,
    bedrooms: 5,
    bathrooms: 4,
    size: 3500,
    rating: 5.0,
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    description:
      'Luxury beachfront villa with private outdoor space and sea views.'
  },
  {
    id: 4,
    name: 'Modern Downtown Loft',
    location: 'Chicago, Illinois',
    daily_price: 120,
    monthly_price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    size: 1400,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    description:
      'Stylish loft in the heart of the city with smart interior design.'
  },
  {
    id: 5,
    name: 'Family Suburban Home',
    location: 'Austin, Texas',
    daily_price: 95,
    monthly_price: 2300,
    bedrooms: 4,
    bathrooms: 3,
    size: 2400,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    description:
      'Spacious and bright home with a large backyard in a quiet neighborhood.'
  },
  {
    id: 6,
    name: 'Cozy Studio Apartment',
    location: 'Boston, Massachusetts',
    daily_price: 60,
    monthly_price: 1500,
    bedrooms: 1,
    bathrooms: 1,
    size: 600,
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description:
      'Compact studio apartment perfect for solo travelers or short city stays.'
  },
  {
    id: 7,
    name: 'Mountain Cabin Retreat',
    location: 'Aspen, Colorado',
    daily_price: 180,
    monthly_price: 4200,
    bedrooms: 3,
    bathrooms: 2,
    size: 1600,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
    description:
      'Warm and cozy cabin retreat surrounded by mountain nature views.'
  },
  {
    id: 8,
    name: 'Urban Loft Space',
    location: 'Portland, Oregon',
    daily_price: 110,
    monthly_price: 2600,
    bedrooms: 2,
    bathrooms: 1,
    size: 1200,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80',
    description:
      'Creative loft living in Portland close to cafes, galleries, and parks.'
  }
];

function findProperty(id) {
  return properties.find((p) => p.id === Number(id));
}

app.get('/', (req, res) => {
  res.render('home', { title: 'RentNest - House Rental', properties });
});

app.get('/listings', (req, res) => {
  res.render('listings', {
    title: 'All Listings - RentNest',
    properties
  });
});

app.get('/listings/:id', (req, res) => {
  const property = findProperty(req.params.id);
  if (!property) {
    return res.status(404).send('Property not found');
  }

  res.render('listing-detail', {
    title: `${property.name} - RentNest`,
    property
  });
});

app.get('/listings/:id/booking', (req, res) => {
  const property = findProperty(req.params.id);
  if (!property) {
    return res.status(404).send('Property not found');
  }

  const success =
    req.query.success === '1'
      ? 'Booking request submitted successfully. We will contact you shortly.'
      : null;

  res.render('booking', {
    title: 'Booking - RentNest',
    property,
    success
  });
});

app.post('/listings/:id/booking', (req, res) => {
  const property = findProperty(req.params.id);
  if (!property) {
    return res.status(404).send('Property not found');
  }

  // Basic required field checking
  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'rental_type',
    'guests',
    'check_in',
    'check_out'
  ];

  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length > 0) {
    return res.status(400).send('Please fill in all required fields.');
  }

  return res.redirect(`/listings/${property.id}/booking?success=1`);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});

