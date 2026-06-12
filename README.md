# Vietnamese Restaurant Website

Full-stack web application for a Vietnamese restaurant that allows customers to browse the menu, add dishes to a shopping cart, and place orders online.

## Key Features

* Display of restaurant menu with detailed information about dishes
* Shopping cart functionality with the ability to add, remove, and update item quantities
* Order checkout process with customer information validation
* Automatic order submission and storage in a PostgreSQL database
* State management using Redux
* Responsive and user-friendly interface built with React and TypeScript
* REST API developed with Node.js and Express for handling business logic and database operations

## Tech Stack

### Frontend

* React.js
* TypeScript
* Redux Toolkit
* React Router
* CSS

### Backend

* Node.js
* Express.js
* PostgreSQL

## Architecture

The application follows a client-server architecture. The frontend communicates with the backend through REST API endpoints. Customer orders are processed by the Express server and persisted in a PostgreSQL database.

## Running the Project

### Frontend

```bash
npm run dev
```

### Backend

```bash
cd backend
npm run dev
```

## Project Goals

This project demonstrates practical experience in developing a full-stack application, including frontend state management, API development, database integration, and implementation of a complete order processing workflow.
