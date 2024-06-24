const { KnexTimeoutError } = require("knex");
const knex = require("../db/connection");

function list() {
    return knex("reservations")
        .select("*")
        .whereNot({ status: "finished" })
        .andWhereNot({ status: "cancelled" })
        .orderBy("reservation_time");
}

function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .whereNot({ status: "finished" })
        .andWhereNot({ status: "cancelled" })
        .orderBy("reservation_time")
}

function create(newReservation) {
    return knex("reservations")
        .insert({
            ...newReservation,
            "status": "booked",
        })
        .returning("*")
        .then((createdRes) => createdRes[0]);
}

module.exports = {
    list,
    listByDate,
    create,
}