This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



# 🌾 Crop Recommendation System (CRS)

CRS is an AI-powered **Crop Recommendation System** designed to help farmers make data-driven decisions based on weather conditions, soil quality, and yield predictions. The project consists of a **Next.js frontend** and a **Neon PostgreSQL-based backend**.

---

## 📌 Project Structure

Here's a clean and well-structured README.md file for your CRS (Crop Recommendation System) project in a single go.

md
Copy
Edit

# 🌾 Crop Recommendation System (CRS)

CRS is an AI-powered **Crop Recommendation System** designed to help farmers make data-driven decisions based on weather conditions, soil quality, and yield predictions. The project consists of a **Next.js frontend** and a **Neon PostgreSQL-based backend**.

---


---

## 🚀 Tech Stack

### 🖥 **Frontend**

- **Next.js** – Server-rendered React framework
- **Tailwind CSS** – Modern styling
- **NextAuth.js** – Authentication system
- **Axios** – API calls
- **React Hook Form & Zod** – Form validation

### ⚙ **Backend**

- **Node.js & Express.js** – Backend API
- **NeonDB (PostgreSQL)** – Cloud-based database
- **Prisma ORM** – Database interaction
- **Bcrypt.js** – Secure password hashing
- **JWT Authentication** – Secure login tokens

---

## 🌍 Frontend Features

### 🔐 **Auth Module (`/auth`)**

- 🌤 **Weather Forecast** – Fetch real-time weather details via OpenWeather API.
- 📊 **Yield Calculator** – Predict crop yield based on inputs.
- 🌱 **Dashboard (Crop Recommendation)** – ML-based recommendations for best crop choices.
- 👤 **Profile & Edit Profile** – Manage user details.

### 🏡 **Guest Module (`/guest`)**

- 🔑 **Login & Register**
- 📩 **Forgot Password & Reset Password**
- ✅ **New Verification**
- 📄 **Contact Us, About Us, and Error Page**

---

## 🛠 Backend Features

### 📌 **API Endpoints**

| Route                    | Method | Description                      |
| ------------------------ | ------ | -------------------------------- |
| `/auth/login`            | POST   | User login                       |
| `/auth/register`         | POST   | User registration                |
| `/auth/updateuser`       | PUT    | Update profile info              |
| `/recommendation/result` | GET    | Get AI-based crop recommendation |
| `/contactus`             | POST   | Handle contact form submissions  |

---

## ⚡ Setup & Installation

### 1️⃣ **Clone the Repository**

```sh
git clone http://github.com/PaddyWebDev/crs.git
cd crs
```

---

## ⚡ Environment Variables

    DATABASE_URL=
    # uncomment next line if you use Prisma <5.10
    DATABASE_URL_UNPOOLED=
    NEXT_AUTH_SECRET=
    EMAIL=
    PASSWORD=
    NEXT_PUBLIC_ML_MODEL_URL=
    OPEN_WEATHER_API_KEY=
    AUTH_TRUST_HOST=
