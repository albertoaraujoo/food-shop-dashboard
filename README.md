# Food-Shop-Dashboard

![Screenshot of the dashboard page](https://imgur.com/8cXLHap.png)

![Screenshot of the orders page](https://imgur.com/0CvtXaU.png)

## 🔥 Introduction

The project helps restaurant and pizzeria owners better control their business. Users have access to order data, can change statuses, and filter them. Additionally, they obtain financial data for the day, month, and more. Graphs are also used to represent this data.

The front end was built with React, using other technologies such as shadcn/ui, Tailwind CSS, Axios, React Query, and Zod. The back end was built with Bun, using Docker for deployment, and a PostgreSQL database.

Unit tests were conducted with Jest and RTL, E2E tests were conducted with Playwright and MSW for the mocks.

### ⚙️ Prerequisites

Before you begin, make sure you have Bun, npm and docker installed on your machine. 

You will also need a code editor, such as VSCode or Sublime Text, to work on the project.


### 🔨 Installation Guide

Steps to install:
```
// 1 - Clone the back-end repository:
git clone https://github.com/albertoaraujoo/dt-money.git](https://github.com/rocketseat-education/pizzashop-api.git

// 2 - create a ".env.local" file and add the code:
API_BASE_URL="http://localhost:3333"
AUTH_REDIRECT_URL="http://localhost:5174"
DB_URL="postgreesql://docker@localhost:5432/pizzashop"
JWT_SECRET_KEY="my-super-secret-key"
RESEND_API_KEY="."

// 3 - run docker and check if it is properly running
docker compose up -d
docker ps

// 4 - Run Bun:
bun i
bun migrate
bun seed
bun dev

// 5 - front-end config
git clone https://github.com/albertoaraujoo/food-shop-dashboard.git
cd /pizza-web-shop
npm i
npm run dev

```
**You can sign in the app using the email: "diego.schell.f@gmail.com", but it can be changed in seed.ts file if you prefer. After logging in with this email, simply go to the terminal of the running backend, copy the provided URL, and paste it into your browser.**


## 📦 Technologies Used:

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Shadcn/Ui](https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![React-Query](https://img.shields.io/badge/React%20Query-FF4154.svg?style=for-the-badge&logo=React-Query&logoColor=white)
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
- ![Phosphor-React](https://img.shields.io/badge/Phosphor%20Icons-3C402B.svg?style=for-the-badge&logo=Phosphor-Icons&logoColor=white)
- ![PlayWright](https://img.shields.io/badge/Playwright-2EAD33.svg?style=for-the-badge&logo=Playwright&logoColor=white)
- ![Zod](https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=Zod&logoColor=white)
- ![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white)
- ![React-Testing-Library](https://img.shields.io/badge/Testing%20Library-E33332.svg?style=for-the-badge&logo=Testing-Library&logoColor=white)
  

