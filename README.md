# Financial Data Filtering App

## Overview
This project is a **Financial Data Filtering App** built with **React (TypeScript)** and styled using **TailwindCSS**. It fetches annual income statements for Apple Inc. (AAPL) from the **Financial Modeling Prep API** and allows users to **filter**, **sort**, and **analyze** key financial metrics.

---

## Features
- **Data Fetching:** Fetches annual income statements using the Financial Modeling Prep API.
- **Dynamic Filters:** Filter data by date range, revenue, and net income.
- **Sorting:** Sort table data by date, revenue, and net income in ascending/descending order.
- **Responsive Design:** Mobile-friendly and optimized for different screen sizes.
- **Dark Mode Support:** Supports dark and light themes with a toggle button.
- **Animations:** Smooth transitions and hover effects for an enhanced user experience.
- **Loading Spinner:** Displays a spinner while fetching data.
- **Error Handling:** Provides error messages in case of issues with the API.

---

## Technologies Used
- **Frontend:** React with TypeScript
- **Styling:** TailwindCSS
- **API:** Financial Modeling Prep API
- **State Management:** React Hooks

---

## Getting Started

### Prerequisites
Ensure you have **Node.js** and **npm** or **yarn** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/financial-data-filtering-app.git
cd financial-data-filtering-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your API key:
```env
REACT_APP_FMP_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with your Financial Modeling Prep API key.

### 4. Run the App
```bash
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Project Structure
```
src/
├── components/
│   ├── DataTable.tsx          # Renders the table for financial data
│   ├── Filters.tsx            # Provides filtering options
│   ├── DarkModeToggle.tsx     # Toggle button for dark mode
├── hooks/
│   ├── useFetchData.ts        # Custom hook for fetching data
├── types/
│   ├── index.ts               # TypeScript types for data model
├── App.tsx                    # Main app component
├── index.tsx                  # React entry point
├── index.css                  # Global styles
└── .env                       # Environment variables
```
