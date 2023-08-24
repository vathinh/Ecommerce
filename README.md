# DACNTT2-TDTU-Ecommerce
***Hướng dẫn khởi chạy cho dự án Công nghệ thông tin 2***

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
	
