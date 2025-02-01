# Zealthy Coding Challenge 🚀

This is a coding challenge provided by **Zealthy** for the role of **Senior Full Stack Engineer**. The goal of this exercise is to create a **Custom Onboarding Flow** for users.

---

## 📜 Description

The exercise consists of developing a **Custom Onboarding Flow** where admins can customize the user onboarding experience dynamically. The application is divided into **three main sections**:

### 🔹 Section 1 - User Onboarding

This is the primary page of the app, where users can register with their **email and password**, and their data will be stored in the backend database. The onboarding follows a **wizard-like flow** to provide a structured experience.

The flow consists of **three pages**:

- **Page 1**: Email & Password input.
- **Page 2 & Page 3**: Configurable fields that can include:
  - 📝 "About Me" text area.
  - 📍 Address fields (street, city, state, zip code).
  - 🎂 Birth Date selection UI.

### 🔹 Section 2 - Admin Panel

Admins can **customize the onboarding flow** by deciding which fields appear on **Page 2** and **Page 3**. Some rules:

- Each page must have **at least one field**.
- Admins can change field placements dynamically.
- The admin panel is accessible via the `/admin` route.

### 🔹 Section 3 - Data Table

A simple **data visualization table** that displays users' information. Key features:

- Updates dynamically as users complete the onboarding process.
- Does not require authentication.
- Accessible via `/data`.

---

## 💡 Solution Approach

### 🎨 UI & UX Design

- Designed the interface using **Figma**, incorporating Zealthy's **visual identity**.
- Created **desktop and mobile screen designs**, but implemented only the **desktop version**.
- Developed a **components page** in Figma to streamline implementation.
- Figma assets and vector files included.

🔗 **Figma:** [Open](https://www.figma.com/design/8sC7WjemcrCi9LQDRVdxxh/Zealthy?node-id=0-1&t=WVGA30Rto1JNVOhf-1)

### 🏗️ Development Environment

- Created a **Next.js app** with **TypeScript** and initialized a **Git repository**.
- Dockerized the application for **easy local setup** and deployment.
- Used **Docker Compose** to spin up both the **Next.js app** and a **PostgreSQL database**.

### 🗃️ Data Modeling & Database

- Used **Prisma** to model the database with **two main entities**:
  - **User**: Stores general user data.
  - **UserAddress**: Keeps address data separately to maintain **database normalization**.
- Applied **migrations** to track schema changes.
- Utilized **PostgreSQL** as the database engine.

### 🔌 APIs

- Developed a set of **REST APIs** using **Next.js API routes**.
- Created a main `user` endpoint:
  - `GET /user` → List all users.
  - `POST /user` → Register a new user or authenticate an existing one.
  - `PATCH /user/:id` → Update user details incrementally.
- **Transactional logic** ensures that user data is saved both in **PostgreSQL** and **AWS Cognito**.
- Created a **Postman collection** for API testing.

🔗 **Postman Collection:** [Open](https://drive.google.com/file/d/1qd5egNEVlbssr_I4auGEtk2WQLfeOKbN/view?usp=sharing)

### 🖥️ Frontend (UI)

- Built with **Next.js 14** and **TailwindCSS** for fast styling.
- Leveraged **Server Components** for **better performance** and **security**.
- Used **Client Components** where necessary for interactivity.
- Implemented **Context API** to manage the onboarding state efficiently.

### ⚙️ Customization

- Utilized **Firebase Firestore** (NoSQL) to store **dynamic onboarding configurations**.
- Integrated **Firebase SDK** for easy data retrieval and updates.

### ✅ Form Handling & Validation

- Used **React Hook Form** + **Zod** for client-side form handling.
- Applied **server-side validation** for extra security.
- Ensured data consistency across API requests and UI forms.

### 🚀 Deployment

- **Vercel** → Hosted the **Next.js app**.
- **AWS RDS** → Hosted the **PostgreSQL database**.
- **Firebase** → Managed Firestore data.
- Used additional **AWS services** (IAM, Cognito, VPC) for authentication and database security.

🔗 **Live App:** [Open](https://zealthy-coding-challenge-psi.vercel.app/)

---

## 📝 Considerations

- 📌 **Only desktop screens** were implemented. Mobile designs were created but are outside the current scope.
- 📌 Some **Figma components** (e.g., user details modal) were **not implemented** due to time constraints.
- 📌 Error handling focuses on **critical issues** (e.g., incorrect credentials). Other errors use basic alerts.
- 📌 Implemented **various problem-solving approaches** to showcase **versatility** in different areas of development.

---

## 📩 Contact

If you have any questions, feel free to reach out!  
📧 **Email:** luizneto.ifnmg@gmail.com

Thank you! 🚀
