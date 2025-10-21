# Poetry Angular App

An elegant web application for searching and reading poems, featuring a unique book-style interface. Built with Angular 20.3.6.

## Features

- 📚 Book-style poem display with left and right pages
- 🔍 Search poems by author or title
- 📖 Responsive design that adapts to different screen sizes
- 📑 Pagination for browsing multiple poems
- 🎯 Modal view for reading full poems
- 🎨 Parchment-style poem cards

## Getting Started

This project uses the [PoetryDB API](https://poetrydb.org) for fetching poem data.

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Usage

1. After starting the development server, navigate to `http://localhost:4200/`
2. Use the search bar at the top to find poems:
   - Enter an author name or poem title in the search fields
   - Click the "Enter" button to search
3. Browse through found poems using the Previous/Next page buttons
4. Click "Read more" on any poem to view its full text in a modal

## Project Structure

```
poetry-angular-app/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── poetry.service.ts    # Handles API communication
│   │   ├── app.config.ts
│   │   ├── app.css                  # Main app styling
│   │   ├── app.html                 # Main app template
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts                   # Main app logic
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Technology Stack

- Angular 20
- RxJS
- TypeScript
- CSS3 with Flexbox/Grid
