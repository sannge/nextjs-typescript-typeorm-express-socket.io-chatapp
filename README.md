# NextJS-Typescript-TailwindCSS-ChakraUI-TypeORM-Express-Redux-Socket.io-ChatApp

## App Functionalities

- The app allows users to sign up, login, and change the password if it was forgotten.
- Users can create chatrooms and view all the chatrooms that are available to join.
- The chatroom view shows how many users are in the chatroom, and the names of the users that are in the chatroom.
- Users can message in realtime.
- Users can link urls.
- Link previews are available.

## Setting Up the Application

- I have included the .env files for your convenience.
- Make sure Node.JS and Postgres(psql, link: https://blog.timescale.com/tutorials/how-to-install-psql-on-mac-ubuntu-debian-windows/) installed globally in the local machine.
- create the database in your local machine (if you would not like to change the existing database_name, create database name **chatapp** by using following command ). Since you have installed psql in the local machine, in a open terminal run **psql**, and then, you will be able to execute SQL queries. Now, run **CREATE DATABASE chatapp;**.
- Goback to root directory. From root directory(TruckMap_ChatApp), go into /client. Then, **yarn** or **npm install**
- Go back to root directory(TruckMap_ChatApp), go into /server. Then, **yarn** or **npm install**
- After that, in the /server directory, run the following command.
  **Npm run typeorm migration:run**
- Now, eveything is ready. In /server, run **yarn dev or npm run dev**, and then go back to root dir, and /client, **yarn dev or npm run**.
- Go to localhost:3000 in your browser.
- Happy Hacking!
