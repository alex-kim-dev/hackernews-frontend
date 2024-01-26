[![CI](https://github.com/alex-kim-dev/hackernews-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/alex-kim-dev/hackernews-frontend/actions/workflows/ci.yml)

# Hacker News frontend test assignment

Develop an interface for the Hacker News website consisting of two pages.

## Product requirements

### Home Page

- [x] Displays the last 100 articles as a list sorted by date, most recent at the top. Each item contains:
  - title
  - rating
  - author's nickname
  - publication date
- [x] Clicking on an article takes you to the article page
- [x] The list should be automatically updated once a minute
- [x] There also should be a refresh button

### Article Page

- [ ] Should contain:
  - news link
  - news headline
  - date
  - author
  - comment count
  - list of comments in the form of a tree
- [ ] Root comments are loaded immediately upon entering the page, nested comments - by clicking on the root one
- [ ] The page should have a button refreshing the list of comments
- [x] The page should have a button to return to the list

### Technical Requirements

- [x] The application is developed using React and MobX
- [x] The official Hacker News API is used. Hacker News API calls and data processing are done directly from the frontend (except if you make an optional Node.JS job)
- [x] Routing is done using React Router v5
- [x] Any UI framework or pure CSS
- [x] Yarn, the application should be launched at localhost:3000 with the yarn start command
- [x] When clicking on links, the page is not reloaded
- [x] Github

### Optional tasks

- [x] Using TypeScript
- [ ] Backend for hosting statics and API for encapsulating external requests in Node.JS
- [ ] Covering code with unit tests

## My enhancements

- [x] Built using my vite-react-template with linters and CI
- [x] Material UI with light/dark mode switching
