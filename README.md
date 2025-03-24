# Travel Website

Triply

## Objective

A simple travel website that allows users to perform CRUD (Create, Read, Update, Delete) operations for trips. This project demonstrates a fullstack application using Node.js, PostgreSQL, and Vue.js (Pinia).

This project includes:

- User Management – Registration, login, profile updates
- Trip Management – Create, view, edit, and delete trips
- Trip Details – Structured trip information with price, dates, and destination
- Authentication – Secure JWT-based authentication
- Authorization – Users can only modify their own trips
- Responsive UI – Works on both desktop and mobile

## Features

### User Management

- User registration, login, and profile management.
- JWT-based authentication.
- Users can only manage their own trips.
- Secure password storage with hashing

### Trip Management

- Create new trips with a title, description, destination, dates, and price
- View a list of trips
- Edit and update trips
- Delete trips (only by the owner)

### Authentication and Authorization

- JWT-based authentication to secure user sessions
- Role-based access control – Users can only modify their own trips

### Responsive Design

- Mobile-friendly and fully responsive UI
- Consistent layout for a seamless experience

### Other Features

- Swagger API documentation.

---

## Tech Stack

### Backend

- **Node.js** with **Express.js** - Scalable API framework
- **PostgreSQL** - Relational database
- **TypeORM** - Database ORM
- **JWT** - Authentication mechanism
- **bcrypt** - Secure password hashing
- **Swagger** - API documentation

### Frontend

- **Vue.js 3** - Reactive and component-based UI framework
- **Pinia** - state management for user authentication and trips
- **Tailwind CSS** - Modern, responsive UI styling
- **Vite** - Fast development server and build tool

### API Documentation

- **Swagger**

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
   git clone https://github.com/meshack-mbuvi/triply.git
   cd triply/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add:
   environment variables as shown in `.env-sample`
4. Start the backend:
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
3. Create .env file and add `VITE_API_URL="http://localhost:8000"`
4. Run the frontend:
   ```sh
   npm run dev
   ```
5. Open the browser and visit `http://localhost:5173`.

---

## API Endpoints

### Authentication

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/users/register` | Register a new user            |
| POST   | `/api/users/login`    | Authenticate user & return JWT |
| PATCH  | `/api/users/profile`  | Update user details            |
| GET    | `/api/users/me`       | Get user details               |

### Trips

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| GET    | `/api/trips/filter` | Filter trips                     |
| GET    | `/api/trips`        | Get all trips (user's own trips) |
| POST   | `/api/trips`        | Create a new trip                |
| GET    | `/api/trips/:id`    | Get a single trip                |
| PATCH  | `/api/trips/:id`    | Update a trip                    |
| DELETE | `/api/trips/:id`    | Delete a trip                    |

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

## Trade-offs

| Choice                   | Trade-off                                           |
|--------------------------|----------------------------------------------------|
| **JWT Authentication**   | Requires token storage on the frontend (localStorage/sessionStorage) |
| **Client-Side Validation** | Needs additional backend validation for security |
| **Only Owner Can Edit Trips** | Limits admin-level modifications |


## License

This project is licensed under the **MIT License**.

---

## Author

[Meshack Mbuvi](https://github.com/meshack-mbuvi)
