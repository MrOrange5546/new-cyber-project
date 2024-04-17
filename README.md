Sure, here's a sample README.md file that outlines the usage of Strapi for the backend, React for the frontend, and how to implement CRUD operations for a chat application with hashed passwords:

```markdown
# Cybersecurity Chat Application

This is a simple chat application built using Strapi for the backend and React for the frontend. It includes authentication with hashed passwords for enhanced security.

## Backend Setup (Strapi)

1. Clone the repository:
   ```
   git clone <https://github.com/nantawatfff/new-cyber-project>
   ```

2. Navigate to the backend directory:
   ```
   cd backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the Strapi server:
   ```
   npm run develop
   ```

5. Access the Strapi admin panel:
   Open your browser and go to `http://localhost:1337/admin` to access the Strapi admin panel. Follow the on-screen instructions to create your first user and set up your data models.

6. Configure hash password settings:
   In the Strapi admin panel, navigate to `Settings` > `Users & Permissions Plugin` > `Roles`. Edit the role settings to enable password hashing and any other necessary permissions.

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. Access the application:
   Open your browser and go to `http://localhost:3000` to access the chat application.

## Features

- **Authentication**: Users can sign up and log in securely with hashed passwords.
- **CRUD Operations**: Users can create, read, update, and delete chat messages.
- **Real-time Updates**: Chat messages are updated in real-time using WebSockets or a similar technology.

## Technologies Used

- **Backend**: Strapi, Node.js, MongoDB (or your preferred database)
- **Frontend**: React, React Router, Axios (or your preferred HTTP client)
- **Authentication**: JWT (JSON Web Tokens), bcrypt (for password hashing)
- **Other**: WebSockets (for real-time updates), Bootstrap or any other CSS framework for styling.

## License

This project is licensed under the [KMUTNB License].
```