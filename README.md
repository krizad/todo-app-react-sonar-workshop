# to-do-list-react

This repository is designed for the SonarQube Workshop. It contains a React To-Do List application built with Vite, serving as a practical example to demonstrate SonarQube code quality analysis, along with unit testing and code coverage using Vitest.

## Features

- **React + Vite**: Fast development server and optimized production builds.
- **Unit Testing**: Pre-configured with Vitest and React Testing Library.
- **Code Coverage**: Integrated with Vitest coverage-v8 to generate coverage reports.
- **SonarQube Integration**: Ready to be analyzed by SonarQube for code quality and security.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Runs the Vitest test suite.
- `npm run test:ui`: Runs the test suite with the Vitest UI.
- `npm run coverage`: Runs tests and generates a code coverage report.

## SonarQube Analysis

To run a SonarQube analysis on this project, ensure you have a SonarQube server running and the `sonar-scanner` installed.

1. Configure your project properties in `sonar-project.properties` (or use the `.example` file as a template).
2. Generate the coverage report first:

   ```bash
   npm run coverage
   ```

3. Run the scanner:

   ```bash
   sonar-scanner
   ```
