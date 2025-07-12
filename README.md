# Pet Watch App

This project is a React Native application developed with React Native CLI, designed to facilitates pet adoption processes, connecting potential pet owners with adoptable animals through a streamlined digital platform.

<video src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/petwatch.mp4" controls width="640" height="480"></video>

### Setup Instructions

To set up and run the app locally, follow these steps:

Clone the repository: [PetWatchApp](https://github.com/majid-cj/PetWatchApp)

```
gh repo clone majid-cj/PetWatchApp
```

Install dependencies:

```
yarn install
```

Run the app:

```
yarn run ios
```

### Project Structure

The source code of the application is organized under the src directory, which includes the following main folders:

#### core:

Contains foundational and reusable code essential for the application.

- components
- constants
- models
- network
- resource

#### hooks:

Includes custom hooks for managing state and logic

#### navigation:

Handles the application's navigation logic and routing.

#### screens:

Organizes the main screens of the app, each within its own subfolder

#### store:

Manages the application's state using Zustand, a small, fast, and scalable state management solution.
