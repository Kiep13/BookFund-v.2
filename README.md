## 📚 Bookfund-v.2
A small application created using React and Node. Handles tables from the database by adding, editing, and deleting records.

Features
- Ability to read books, mark them as favorites or read
- Search by author, genre and so on
- View book collections
- Save articles or their links, folder system for storing them
- Authorize via Google, GitHub and Facebook
- Admin panel for editing authors, genres and books
- See usage statistics in Admin dashboard

### 🐋 Docker

To run docker image, go to **docker** folder and run next command (your cmd should be in the same folder as dockerfile):
```
  docker build -t bookfund-postgres .
```

And then to create docker container, run second command:
```
  docker run --name bookfund-postgres -p 5432:5432 -d bookfund-postgres
```

### 🖥️ Installation

To run application you must run follow command:
- `npm install nx -g`
- `npm install`

### 💾 Database

To run migrations in production mode use command:
```
  nx run webapi:migrations
```
To add seed data:
```
  nx run webapi:seed
```
To do the same in local environment 
```
  npm run migrations:run
  npm run seed:run
```

### 🚀 Start application

If you want to open project locally, not forget include dev mode environment variable in migrations and seeds commands. 
For example: 
```
nx run PROJECT_NANE:dev
```

### 🏛️ Build

To build project run the following commands
```
nx build webapi
nx build webapp --stats-json
```
To check webapp bundle size after build run:
```
npm run analyze:webapp
```

Note: webapi requires node v.18.0.0 for work
