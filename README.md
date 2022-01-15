# Bookfund-v.2
A small application created using React and Node. Handles tables from the database by adding, editing, and deleting records.

<p align="center">
<img src="screenshots/screenshot1.png" alt="screenshot1" width="600">
<img src="screenshots/screenshot2.png" alt="screenshot2" width="600">
<img src="screenshots/screenshot3.png" alt="screenshot3" width="600">
</p>

### Docker

To run docker image, go to **docker** folder and run next command (your cmd should be in the same folder as dockerfile):
```
  docker build -t bookfund-postgres .
```

And then to create docker container, run second command:
```
  docker run --name bookfund-postgres -p 5432:5432 -d bookfund-postgres
```

### Database

To simply run migrations use command:
```
  npm run migrations
```
