# The Band E-commerce Platform

## Overview
This is a modern e-commerce web application built with React and TypeScript, featuring both customer-facing and admin interfaces. The platform includes product management, shopping cart functionality, and an admin dashboard with analytics.

## Screenshots

### Landing Page
![Landing Page](/src/assets/Screenshot%20from%202025-02-07%2011-43-24.png)
*Homepage featuring promotional banners and featured products*

### Product Catalog
![Product Catalog](/src/assets/Screenshot%20from%202025-02-07%2011-43-11.png)
*Product grid view with filtering and sorting options*

### Admin Dashboard
![Admin Dashboard](/src/assets/Screenshot%20from%202025-02-07%2011-48-22.png)
*Analytics dashboard showing sales performance and inventory status*

### Admin Login
![Admin Login](/src/assets/Screenshot%20from%202025-02-07%2011-47-44.png)
*Secure authentication page for admin access*

## Features

### Customer Portal
- Responsive navigation bar with cart integration
- Product catalog with filtering and sorting
- Interactive product cards
- Testimonials section
- Shopping cart functionality
- Promotional banners

### Admin Portal
- Secure authentication system
- Analytics dashboard
- Complete product management (CRUD operations)
- Inventory tracking
- Sales performance visualization

### Admin Portal Password
{
"email": "john@mail.com",
"password": "changeme"
}

## Technologies Used
- React 18
- TypeScript
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Shadcn/ui Components
- RESTful API Integration
- Recharts for Analytics

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository
```bash
git clone https://github.com/Guantaijp/the-band-ecommerce
```

2. Navigate to project directory
```bash
cd the-band-ecommerce
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=the-band-ecommerce.vercel.app
```

## Navigation
- Homepage: `/`
- Product Listing: `/products`
- Product Details: `/products/:id`
- Cart: `/cart`
- Admin Login: `/login`
- Admin Dashboard: `/admin/dashboard`

**Note**: To access the admin dashboard, navigate to `/login` or `/admin/dashboard`. If not authenticated, you'll be redirected to the login page.

## Project Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── store/            # Redux store configuration
├── services/         # API services
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── types/            # TypeScript definitions
└── assets/           # Static assets
```

## API Integration
The application integrates with a RESTful API for:
- Product management
- User authentication
- Order processing
- Analytics data

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
- Email: jpguantai@gmail.com
- Phone: (+254) 795-070-535
- Website: https://guantaijp.vercel.app/

## License
This project is proprietary and confidential.