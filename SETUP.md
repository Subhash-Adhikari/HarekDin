# Grocery E-Commerce Platform

A full-stack e-commerce application for grocery shopping with React frontend and Django REST API backend.

## Features

- User authentication (register, login, profile management)
- Product browsing and searching
- Shopping cart functionality
- Wishlist management
- Address management
- Admin dashboard

## Tech Stack

### Frontend
- React.js
- React Router
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite database (can be configured for PostgreSQL)

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser (admin):
   ```
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login a user
- `POST /api/auth/token/refresh/` - Refresh JWT token

### User
- `GET /api/users/profile/` - Get user profile
- `PATCH /api/users/profile/` - Update user profile

### Addresses
- `GET /api/addresses/` - List user addresses
- `POST /api/addresses/` - Create a new address
- `GET /api/addresses/{id}/` - Get address details
- `PUT /api/addresses/{id}/` - Update an address
- `DELETE /api/addresses/{id}/` - Delete an address

### Products
- `GET /api/products/` - List all products
- `GET /api/products/?category={category}` - Filter products by category
- `GET /api/products/{id}/` - Get product details