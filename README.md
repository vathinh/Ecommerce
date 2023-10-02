# Ecommerce
***Hướng dẫn khởi chạy cho dự án Công nghệ thông tin 2***



# Ecommerce API Setup Instructions

# Docker Compose
cd /path/to/your/project  # Navigate to your project directory
docker-compose up -d     # Start Docker containers in detached mode

# Starting Services
# Eureka Server (Service: Eureka)
# Start the Eureka service.

# Other Services
# Start the rest of the services as needed for your application.

# API Gateway
# Run the API Gateway service.

# Admin Frontend
cd Admin\ FE              # Change directory to Admin FE
npm install               # Install dependencies
ng serve                  # Start the development server
# Access the application at http://localhost:4200

# Customer Frontend
cd Customer\ FE           # Change directory to Customer FE
npm install               # Install dependencies
npm start                 # Start the development server
# Access the application at http://localhost:3000

# Database Access
# Use DBBeaver or DataGrip with the following database credentials:
# Host: localhost
# Port: 5432
# User: root
# Password: root
# Database: ecom

# Postman Setup
# Import the JSON collection from the postman folder into Postman.
# Submit a sign-in request to create a user.

# User Role Configuration
# In your database management tool:
# - Go to the Roles table and add a new row with ID: e11f7947-d41d-461e-bc39-ccdf2164e7p1, Role Name: ADMIN
# - Update the user's role inside the users_roles table with ID: e11f7947-d41d-461e-bc39-ccdf2164e7p1.
# Save your changes.

# You can now log in to http://localhost:4200 with admin privileges.




*Backend:
- Sử dụng extension IntelliJ IDEA Community cho Backend
- Instal JDK version 17 và Maven
- Mở extension và truy cập vào folder Ecommerce.Api
- Cách chạy một service:
  + Mở folder của một service muốn chạy
  + Truy cập vào /src/main/java/com/cntt2/{Tên service}/{Tên service}Application.java
  + Ví dụ: /User/src/main/java/com/cntt2/user/UserApplication.java
  + Di chuột vào phía bên trái của chữ "Public" sẽ có một mũi tên màu xanh 
  + Bấm vào mũi tên, sau đó chọn "Run UserApplication..."
  + Service sẽ bắt đầu build và chạy
  + Nếu chạy thành công thì sẽ báo "Started UserApplication..."
- Trình tự mở các service"
  + EurekaService
  + UserService
  + ProductService, OrderService, PaymentService, HistoryService, ImageService
  + APIGateway
- Sau khi chạy thành công hết các service thì có thể sử dụng Backend bằng uri: 
http://localhost:8080


*Frontend (Main website)
- Sử dụng Visual Studio Code
- Truy cập vào folder Ecommerce.Website
- Bật terminal và chạy lệnh "npm i"
- Sau khi install package thành công thì chạy lệnh "npm start"
- App start thành công thì sẽ chạy ở uri:
http://localhost:3000


*Frontend (Admin website)
- Sử dụng Visual Studio Code
- Truy cập vào folder Ecommerce.Website
- Bật terminal và chạy lệnh "npm i"
- Sau khi install package thành công thì chạy lệnh "npm start"
- App start thành công thì sẽ chạy ở uri:
http://localhost:4200
	
