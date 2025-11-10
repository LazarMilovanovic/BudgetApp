# Frontend Developer Assignment – Budget App

## 🎯 Objective

Build an interactive **Budget Management Application** that visually tracks income and expenses.
The goal is to demonstrate your frontend development skills — including data management, UI/UX, and creativity.

---

## 🛠️ Core Requirements

### 1. Budget Tracking

-   Allow users to **add** and **remove** transactions with:
    -   Description
    -   Amount (positive for income, negative for expense)
-   Each transaction must display:
    -   **Type** (Income / Expense)
    -   **Title / Description**
    -   **Value** (formatted with a + or − sign)
    -   **Date and time** when it was added
-   Display the **total available budget**, **total income**, and **total expenses**.
-   Show a **percentage indicator** representing how much of the income is spent (e.g., _Expenses = 65% of income_).

### 2. Persistent Data

-   Store all transactions using **localStorage**, **sessionStorage**, or **cookies** — whichever you find most appropriate.
-   Data must persist after page refresh and reflect all updates immediately in the UI.
-   Include an option to **clear all stored data** (e.g., a “Reset Data” button) to start fresh.

### 3. Seasonal Background

-   The app’s **background should change automatically** based on the **current season**:
    -   🌸 **Spring** → light green / nature image or video
    -   ☀️ **Summer** → sunny / beach image or video
    -   🍂 **Autumn** → orange forest (like the provided example)
    -   ❄️ **Winter** → snow / cold-themed background
-   Use either **videos** or **static images**, loaded dynamically depending on the current month.

### 4. Visual Representation

-   Use **colored progress bars** or **percentage labels** to represent income vs. expenses.
-   Expenses should be shown in **red**, income in **green or blue**.
-   The percentage label (e.g., “96%”) should update dynamically when transactions are added or removed.

---

## 💡 Bonus Features (Optional)

-   Edit transactions directly in the list.
-   Filter transactions by **category** (e.g., Food, Rent, Travel).
-   Show a **chart or graph** summarizing monthly performance using Chart.js or amCharts or something else.
-   Smooth **transition or fade effects** when seasonal backgrounds change.
-   Add full validation for input

---

## ⚙️ Technical Requirements

-   You may use **HTML, CSS, and JavaScript**
-   Follow best practices:
    -   Clean, modular code structure
    -   Reusable components
    -   Responsive design (Mobile - Desktop)
    -   Semantic HTML

---

## 📦 Deliverables

-   A **public GitHub repository** containing the full source code.
-   A **live demo** (GitHub Pages).
-   A short **README.md** including:
    -   Installation and run instructions
    -   Technologies used

---

## 🧑‍💻 Evaluation Criteria

| Category          | Description                                               |
| ----------------- | --------------------------------------------------------- |
| **Functionality** | All core features implemented and working correctly       |
| **Code Quality**  | Clean, modular, maintainable code                         |
| **UI/UX**         | Responsive, clear, visually appealing interface           |
| **Creativity**    | Extra features or animations beyond the base requirements |
| **Documentation** | Clear setup guide and concise project overview            |

---

## 🧠 Learning Focus

## This task is designed to help you practice:

-   DOM manipulation and event handling
-   Working with browser storage (localStorage / sessionStorage / cookies)
-   Responsive layout and clean CSS organization
-   Basic data calculation and UI updates
-   Structuring your code logically and keeping it readable

---

**Good luck, and have fun coding! 🚀**
