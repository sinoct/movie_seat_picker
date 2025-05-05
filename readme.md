## Movie Seat Picker

#### Needed tools:
- node.js version 20+
- docker

### How to start
After cloning the application create a .env file in the root folder and add these variables

    PORT_NUMBER=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=postgres
    DB_USERNAME=postgres
    DB_PASSWORD=postgres

After the environmental variables have been added make sure docker is running on your computer and run this command while you're in the project folder in your terminal.

`docker compose up db -d`

At this point our postgres database should be up and running. Now run `npm i` after that is done start the application using `npm run dev`.

#### Testing
You can run the tests for the application using `npm run dev`
You can run the linter as well using `npm run lint`

After this the application should be accessible on `http://localhost:3000`

You can test the application either by using the included postman collection in `movie_seat_picker.postman_collection.json` or by using this other frontend application: [Frontend app](https://github.com/sinoct/movie_seat_picker_frontend "Frontend app")
