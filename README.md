# Travel Website

## Objective
A simple travel website that allows users to perform CRUD (Create, Read, Update, Delete) operations for trips. This project demonstrates a fullstack application using Node.js, PostgreSQL, and Vue.js (Pinia).

## Features
### User Management
- User registration, login, and profile management.
- JWT-based authentication.
- Users can only manage their own trips.

### Trip Management
- Users can create, view, edit, and delete trips.
- Each trip has:
  - Title
  - Description
  - Origin
  - Destination
  - Start date
  - End date
  - Price

### Other Features
- Responsive UI for both desktop and mobile.
- Swagger API documentation.

---

## Tech Stack
### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** as the database
- **TypeORM** for database interactions
- **JWT** for authentication

### Frontend
- **Vue.js 3**
- **Pinia** for state management

### API Documentation
- **Swagger**
- **Postman Collection**

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- PostgreSQL
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/triply.git
   cd triply/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add:
   ```sh
   DATABASE_URL=your_postgres_connection_string
   SECRET_KEY=your_jwt_secret
   ```
4. Run database migrations:
   ```sh
   npm run migrate
   ```
5. Start the backend:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd triply/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```
4. Open the browser and visit `http://localhost:5173`.

---

## API Endpoints
### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Authenticate user & return JWT |
| PATCH | `/api/users/profile` | Update user details |

### Trips
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/trips/filter` | Filter trips
| GET | `/api/trips` | Get all trips (user's own trips) |
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips/:id` | Get a single trip |
| PATCH | `/api/trips/:id` | Update a trip |
| DELETE | `/api/trips/:id` | Delete a trip |

> **Note:** All trip-related endpoints require authentication via a Bearer token.

---

## API Documentation
- **Swagger UI**: Accessible at `http://localhost:8000/api-docs`.

---

## Design Decisions & Trade-offs
1. **TypeORM** was chosen for seamless integration with PostgreSQL and flexibility in handling relationships.
2. **JWT authentication** was implemented for scalability and security.
3. **Vue 3 + Pinia** were selected for state management due to their efficiency and ease of use.
4. **Swagger** was used for API documentation to ensure a clear and structured reference.

---

## Future Enhancements
- Implement role-based access control (RBAC) for admin and users.
- Add image uploads for trip listings.
- Implement payment integration for booking trips.

---

## License
This project is licensed under the **MIT License**.

---

## Author
[Meshack Mbuvi](https://github.com/meshack-mbuvi)

