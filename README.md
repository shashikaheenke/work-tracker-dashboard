# Work Tracker Dashboard

A portfolio-ready React dashboard that shows how a small team could replace a messy Excel/CSV work tracker with a clean internal dashboard.

This project uses fake data only. It does not use any company code, internal screenshots, client names, or real operational data.

## Live Demo

[View Live Demo](https://work-tracker-dashboard-sable.vercel.app/)

## Features

- Summary cards for total work, completed work, overdue items, blocked items, and hours
- Search across ID, title, owner, team, status, priority, type, source, and notes
- Filter by status, team, and priority
- Simple status and priority charts using CSS
- Responsive dashboard layout
- Work item table with badges and progress bars
- CSV export of the filtered results

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## How to Run

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Build for Production

```bash
npm run build
npm run preview
```

## Suggested Portfolio Description

I built a Work Tracker Dashboard for small teams that currently manage work using Excel, CSV files, or manual trackers. The dashboard turns fake operational work data into summary cards, filterable tables, status summaries, progress indicators, and CSV export. This project demonstrates React state management, reusable components, filtering logic, basic data transformation, responsive UI design, and clean portfolio-safe fake data.

## Next Improvements

- Add a form to create a new work item
- Save data to localStorage
- Add sorting by due date and priority
- Add charts using a chart library
- Add backend API using Node.js and SQL later
