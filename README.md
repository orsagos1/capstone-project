**Period Tables Restaurant Reservation**
---------------------------------------------------------------------------------

Installation:
---------------------------------------------------------------------------------
1. Clone this repository to a local directory.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URLs to your PostgreSQL database instances.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start` to start the application in development mode.


Usage
---------------------------------------------------------------------------------
A full-stack reservation system designed to simplify the management of a restaurant's daily resservations. Using Periodic Tables allows restaurant employees to:

- Create and Edit new reservations for customers
- Browse existing reservations by date
- Find specific reservations using the associated customers phone number
- Edit the number of tables in the restaurant and their capacity
- Seat reservations at a table, and amrk that table as 'occupied'
- Mark a table as 'free' once a party has left and the table is ready for the next guests


Tech Stack
---------------------------------------------------------------------------------
- Node.js: server environment for backend execution
- Express: web app framework for developing the API
- React: UI logic and rendering
- PostgreSQL: SQL database for application data

Application Previews
---------------------------------------------------------------------------------
Dashboard
![Screenshot 2024-08-19 at 4 35 02 PM](https://github.com/user-attachments/assets/9a89f4c6-602a-4034-b589-8af96adb3d3f)

Search for Reservation
![Screenshot 2024-08-19 at 4 35 24 PM](https://github.com/user-attachments/assets/ed502cab-8ed0-4b39-8661-eb1deb2014d6)

Create a New Reservation
![Screenshot 2024-08-19 at 4 35 37 PM](https://github.com/user-attachments/assets/1e4c5bbd-2d29-4124-8172-a9745c89616a)

Create a New Table
![Screenshot 2024-08-19 at 4 35 47 PM](https://github.com/user-attachments/assets/e0a7b004-257f-4068-8da5-2307e0d99e4c)

Edit a Current Reservation
![Screenshot 2024-08-19 at 4 36 31 PM](https://github.com/user-attachments/assets/a82382fa-938e-403b-9c26-cfa9db03c299)

Seat the Current Reservation
![Screenshot 2024-08-19 at 4 36 45 PM](https://github.com/user-attachments/assets/6d10ab0d-acf3-4f3e-a93d-dd141aa56d12)


API Routes
---------------------------------------------------------------------------------

| Method | Route | Function |
| --- | --- | --- |
| `GET`    | `/reservations` | Gets the complete list of reservations, sorted by `reservation_date` and `reservation_time`. |
| `GET` | `/reservations?date=YYYY-MM-DD` | Gets all reservations made or the specified date, sorted by `reservation_time`. |
| `POST` | `/reservations` | Validates the posted reservation, adding it to the database if validations pass. |
| `GET` | `/reservations/:reservationId` | Gets the reservation with the specified ID, assuming such a reservation exists in the database. |
| `PUT` | `/reservations/:reservationId` | Validates the updated reservation information, updating the reservation with the specified ID using the sent data if validations pass. |
| `PUT` | `/reservations/:resrvationId/status` | Updates the status of the reservation with the specified ID according to the `status` parameter inside of the requirest body data. |
| `GET` | `/tables` | Gets the complete list of tables. |
| `POST` | `/tables` | Validates the posted table, adding it to the database if validations pass. |
| `PUT` | `/tables/:tableId/seat` | Seats the specified table using the reservation specified in the request body data. Updates the reservation's entry to a status of `seated` and the table's entry to the reservation_id of the given reservation. |
| `DELETE` | `/tables/:tableId/seat` | Finishes the specified table. Updates the table's reservation_id to `null` and the associated reservation's status to `finished`. |
