# simple-timesheet-express-ts
Simple timesheet backend using Express(typescript) liberally 

**คำอธิบาย**

>Repository นี้เป็นตัวอย่างการพัฒนา Backend API ด้วย ExpressJS (TypeScirpt) โดยการลองทำ Project ง่ายๆ เกี่ยวกับการทำลงเวลาเข้าออกงาน และการลางาน 
>ใน project นี้จะใช้ Jest library ในการทดสอบความถูกต้องของ program และจะใช้หลักการของ TDD (Test Driven Development) เข้ามาปรับใช้ในการพัฒนา Project 
>ในส่วนของ Database จะใช้ MySQL โดยจะ deploy อยู่ใน Docker Container
>ในส่วนของ Front-end จะเป็นการใช้ HTML + JavaScript เบื้่องต้นเท่านั้น 

#### Features
- [ ] Time in - out
- [ ] Calculate hours per day and hours of overtime
- [ ] Calculate total hours and total Days
- [ ] leave request

#### Liberally
*backend* : ExpressJS (TypeScript), Jest (unittest, integation, e2e), TypeORM and MySQL(Docker Contriner)

*frontend* : simple HTML

#### Database diagram
![Screen Shot 2565-05-27 at 13 53 06](https://user-images.githubusercontent.com/82103342/170647118-d02e60f2-b160-435e-833b-7785c3348208.png)

#### UI design

![Uploading Screen Shot 2565-05-27 at 14.30.44.png…]()
