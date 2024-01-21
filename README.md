```shell
# Ecommerce API Setup Instructions

## Docker Compose
cd /path/to/your/project
docker-compose up -d

## Starting Services
# Eureka Server (Service: Eureka)
# Start the Eureka service.

# Other Services
# Start the rest of the services as needed for your application.

# API Gateway
# Run the API Gateway service.

## Admin Frontend
cd Admin\ FE
npm install
ng serve
# Access the application at http://localhost:4200

## Customer Frontend
cd Customer\ FE
npm install
npm start
# Access the application at http://localhost:3000

## Database Access
Use DBBeaver or DataGrip with the following database credentials:
Host: localhost
Port: 5432
User: root
Password: root
Database: ecom

## Postman Setup
Import the JSON collection from the postman folder into Postman.
Submit a sign-in request to create a user.

## User Role Configuration
In your database management tool:
Go to the Roles table and add a new row with ID: e11f7947-d41d-461e-bc39-ccdf2164e7p1, Role Name: ADMIN.
Update the user's role inside the users_roles table with ID: e11f7947-d41d-461e-bc39-ccdf2164e7p1.
## Save your changes.

## You can now log in to http://localhost:4200 with admin privileges.





	
