# Writers Hub

Writers Hub is a Next.js application designed for writers to log in manage their accounts and create content in an elegant responsive user interface. The app uses **Appwrite** for backend database and authentication with modern features like responsive design session management and secure storage of user credentials.

---

## Features

### 1. **User Authentication**
- Login and Registration functionality with credentials stored securely in an Appwrite database.
- Passwords are hashed using `bcrypt` for enhanced security.

### 2. **Dashboard**
- A personalized dashboard for logged-in users.
- Displays a welcome message with the username of the logged-in user.
- Includes a responsive text editor for content creation.
- Fixed sidebar with navigation placeholders.

### 3. **Session Management**
- Session-based authentication using `localStorage` to manage user sessions.
- Protects the dashboard route from unauthorized access by redirecting users to the login page if no session is found.

### 4. **Logout Functionality**
- A logout button allows users to terminate their session and return to the login page.

### 5. **Responsive Design**
- Built with Tailwind CSS to ensure a seamless experience across all devices.
- Sidebar is hidden on smaller screens for better usability.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone repository link
   cd writers-hub
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   NEXT_PUBLIC_PROJECT_ID=your-appwrite-project-id
   NEXT_PUBLIC_DATABASE_ID=your-database-id
   NEXT_PUBLIC_USER_COLLECTION_ID=your-user-collection-id
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```plaintext
.
├── src/
│   ├── app/
│   │   ├── page.js         # Login Page
│   │   ├── register/
│   │   │   └── page.js     # Registration Page
│   │   ├── dashboard/
│   │   │   └── page.js     # Dashboard Page
│   └── styles/             # Tailwind CSS
├── .env                    # Environment Variables
├── README.md               # Project Documentation
├── package.json            # Project Dependencies
└── tailwind.config.js      # Tailwind Configuration
```

---

## Usage

### 1. **Registration**
- New users can register by entering their desired username and password.
- User credentials are securely stored in an Appwrite database.

### 2. **Login**
- Existing users can log in with their credentials.
- If credentials are valid they will be redirected to the dashboard.

### 3. **Dashboard**
- Access your personalized dashboard after logging in.
- Write and manage content in the integrated text editor.
- Use the fixed sidebar for navigation.

### 4. **Logout**
- Click the logout button to terminate your session and return to the login page.

---

## Technologies Used

### Frontend:
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend:
- [Appwrite](https://appwrite.io/) for database and authentication.

---

## Future Enhancements

- Integrate advanced text editor features (e.g. formatting autosave).
- Add user profile management.
- Implement role-based access for collaborative features.
- Improve sidebar with customizable navigation.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

Feel free to update the contact section or enhance the "Future Enhancements" as your project evolves!