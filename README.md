# User Management System

## Overview

This project is a simple User Management System that consists of a client-side React Native application and a server-side API built with Node.js and SQLite. The system allows users to view, add, update, and delete user records. It also provides sorting functionality and a modal to display the total number of users.

## Features

- **Get Users**: Retrieve and display a list of users.
- **Add User**: Add a new user to the database.
- **Update User**: Modify details of an existing user.
- **Delete User**: Remove a user from the database.
- **Sorting**: Sort users by different fields.

## API Endpoints

### Users Resource

| URL                           | Method | Description                                           | Permissions    | Parameters  | Optional Parameters | Body | Headers | Returns                                  | Status Codes      |
|-------------------------------|--------|-------------------------------------------------------|----------------|-------------|---------------------|------|---------|------------------------------------------|-------------------|
| `http://localhost:3000/users` | GET    | Get all users                                        | ---            | ---         | ---                 | ---  | ---     | Array of user objects                    | 200 OK            |
| `http://localhost:3000/users` | POST   | Add a new user                                       | ---   | ---         | ---                 | Yes  | ---     | ID of the newly created user             | 201 Created       |
| `http://localhost:3000/users/:id` | PUT  | Update existing user (by ID)                         | ---            | `id`         | ---                 | Yes  | ---     | Number of rows updated                   | 200 OK            |
| `http://localhost:3000/users/:id` | DELETE | Delete user by ID                                   | ---            | `id`         | ---                 | ---  | ---     | Number of rows deleted                   | 200 OK            |

## Setup

### Server

1. **Install Dependencies**: 
    Navigate to the server directory and run:
   ```bash
   npm install
2. **Run Server**:
    Start the server with:
    ```bash
    node server.js
The server will be running at http://localhost:3000/users.

### Client
1. **Install Dependencies**: 
    Navigate to the server directory and run:
   ```bash
   npm install
2. **Run Application**:
    Start the React Native application with
   ```bash
   npm start
## Configuration

- **API URL**: Update the `API_URL` in the `userService.js` file to match your server's IP address and port if it's different from `http://192.168.33.12:3000/users`.

## Usage

- **View Users**: The main screen displays a list of users with options to sort, edit, and delete.
- **Add User**: Use the "Add User" button to open a form for creating a new user.
- **Edit User**: Click the edit button on a user row to modify user details.
- **Delete User**: Click the delete button on a user row to remove the user.




