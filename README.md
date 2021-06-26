# Pomodoro timer

A very simple pomodoro timer I made to split work in small tasks with small breaks
in between. This can increase productivity by eliminating distractions during the
focus time (25 minutes) and taking a small break (5 minutes) after each period of
focused work.

I made this in my spare time mainy for learning purposes:
- For learning purposes I tried to keep it simple on purpose by not using a real UI
  framework like React or a big module bundler which needs configuration like Webpack.
  I figured this could be added later when really needed. Instead I just tried to use
  the modern JavaScript features to work with the DOM and divide the logic in several
  controllers
- For bundling I used [ParcelJS](https://parceljs.org/), because it works
without any explicit configuration.\
- I used Typescript, because I never used it before.
- I made my own SVG icons for the buttons with Affinity Designer.
- The first time I used [the web workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
  so that the timer keeps running even when you go to another tab or application.
- The first time I used [the notificaiton API](https://developer.mozilla.org/en-US/docs/Web/API/notification)
  to notify the user when the focus time or break time is ended when in another tab
  or application.

## Hosting

It is hosted on Netlify: https://koen-pomodoro.netlify.app/. Every push
to the `master` branch will trigger a production deploy. Pull requests against
this branch will also get their own deploy previews to check how the new changes
would look like in a production environment.

## Requirements

- Node (I used version `12.13.0`)
- Yarn (I used version `1.22.5`)

## Development

The first time the dependencies need to be installed by running `yarn` in the terminal.

To start the local development server run the following command:

```bash
yarn dev
```

It should start a local server on `http://localhost:1234/` which live reloads on
every saved change.

## Build

To create a production build, run the following command:

```bash
yarn build
```
