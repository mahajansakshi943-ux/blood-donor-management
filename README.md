# Blood Donor Management System

A web-based Blood Donor Management System developed using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript.

The system helps manage blood donors and blood requests through a simple web interface and REST APIs.

## Features

### Donor Management
- Donor Registration
- View All Donors
- Edit Donor Details
- Delete Donors
- Search Donors by Blood Group
- Search Donors by City
- Combined Blood Group + City Search
- Donor Availability Management

### Blood Request Management
- Blood Request Registration
- View Blood Requests
- Delete Blood Requests

### Validation
- Name validation
- Age validation
- Blood group validation
- Phone number validation
- City validation
- Backend validation error handling

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- HTML5
- CSS3
- JavaScript
- Maven
- REST API

## Project Architecture

The project follows a layered architecture:

- **Controller** – Handles REST API requests
- **Service** – Contains business logic
- **Repository** – Handles database operations using JPA
- **Entity** – Represents database tables
- **Exception** – Handles validation errors
- **Static Frontend** – HTML, CSS and JavaScript

## Project Structure

```text
blood-donor-management/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/blooddonor/blooddonor/
│   │   │       ├── controller/
│   │   │       ├── entity/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── exception/
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── style.css
│   │       │   └── script.js
│   │       └── application.properties
│   │
│   ├── test/
│   │
│   └── pom.xml
│
├── .gitignore
├── mvnw
├── mvnw.cmd
└── test.http