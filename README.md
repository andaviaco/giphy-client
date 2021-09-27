# Simple Giphy App

## About the project
This project is a simple application consuming the Giphy API. It displays a list of Gifs with a search input. Select a gif to see some of the available renditions.

The project was initialized using **create-react-app** with the **typescript** template.

### Extra Dependencies
**UI Library**.
I'm using [Chakra UI](https://github.com/chakra-ui/chakra-ui) as my component library. Its simplicity and flexibility have helped me develop the UI in a short time. I especially like the focus the put into making accessible components

**Prettier**.
It is nice to have a code formatting tool for a better developer experience. ESLint, for code quality, is already included thanks to create-react-app.

**Mock Service Worker**.
I added MSW to mock the Giphy API response for the integration tests.

### Time invested and extra notes
According to my time tracker ([Toggl](https://toggl.com/track/)), I spent around 11 hours on this project.

With enough time, I would work on some additional improvements:
- Unit testing for custom hooks.
- Handling errors with an error boundary.
- A better UI. There are places where the UI could improve.

## Setup

**Install dependencies**
```
npm install
```

**Set environment variables**

Create your `.env` file using `.env-example` as example.

The following variables have to be set:
- `REACT_APP_GIFS_API_URL`
- `REACT_APP_GIFS_API_KEY`


**Run the app**
```
npm start
```

## Run tests
It is necessary to have the right environment variables to run the tests locally. Create a file called `.env.test.local` to set them.

**Run tests**
```
npm test
```
