# HIREQUOTIENT_ASSIGNMENT
Created A comprehensive backend for a real-time chat application using the MERN stack, emphasizing the use of Node.js and MongoDB for server-side logic and database management.

## Prerequisites
List of dependencies or tools needed to run the project, such as:
- Node.js
- npm (Node Package Manager)

## .env Setup
1. create a .env file in root directory
2. Add configuration  : `PORT=  ,
MONGO_DB_URI=   ,
JWT_SECRET=    ,
NODE_ENV=   ` 


## Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.
4. Access the frontend application at `http://localhost:3000` in your browser.

## Backend Setup
1. Navigate to the `root` directory.
2. Install dependencies: `npm install` 
3. Start the backend server: `npm start` .
4. The backend server should now be running at port 5000 and accessible at the specified port.

# Chat Application API

## Routes

### Auth Routes

1. **Route:** `/api/auth/signup`
   - **Method:** POST
   - **Description:** Register a new user.
   - **Expected Input:**
     - Body:
       - `fullname`: String (required) - full name of the user.
       - `username`: String (required) - Username of the user.
       - `password`: String (required) - Password of the user.
       - `confirmpassword`: String (required) - Password of the user.
       - `gender`: String (required) - gender of the user.
   - **Expected Output:**
     - Success: Returns user object with username and JWT token as cookies.
     - Error: Returns error message if registration fails.

2. **Route:** `/api/auth/login`
   - **Method:** POST
   - **Description:** Log in an existing user.
   - **Expected Input:**
     - Body:
       - `username`: String (required) - Username of the user.
       - `password`: String (required) - Password of the user.
   - **Expected Output:**
     - Success: Returns user object with username and JWT token.
     - Error: Returns error message if login fails.

3. **Route:** `/api/auth/logout`
   - **Method:** POST
   - **Description:** Log out the currently logged-in user.
   - **Expected Input:**
     - Headers:
       - `Authorization`: String (required) - JWT token of the logged-in user.
   - **Expected Output:**
     - Success: Returns success message.
     - Error: Returns error message if logout fails.

### Messages Routes

1. **Route:** `/api/messages/send/:receiver_id`
   - **Method:** POST
   - **Description:** Send a message to a specific receiver.
   - **Expected Input:**
     - Body:
       - `message`: String (required) - Message to be sent.
     - Params:
       - `receiver_id`: String (required) - ID of the receiver user.
   - **Expected Output:**
     - Success: Returns sent message object with sender ID, receiver ID, and message content.
     - Error: Returns error message if message sending fails.

2. **Route:** `/api/messages/:receiver_id`
   - **Method:** GET
   - **Description:** Retrieve messages exchanged with a specific receiver.
   - **Expected Input:**
     - Params:
       - `receiver_id`: String (required) - ID of the receiver user.
   - **Expected Output:**
     - Success: Returns array of message objects exchanged with the specified receiver.
     - Error: Returns error message if message retrieval fails.

### Users Routes

1. **Route:** `/api/users`
   - **Method:** GET
   - **Description:** Get information about all users.
   - **Expected Input:** None
   - **Expected Output:**
     - Success: Returns array of user objects containing user details.
     - Error: Returns error message if user retrieval fails.

   

