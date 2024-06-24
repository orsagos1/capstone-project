const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation Middleware
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Body must have data property",
  })
}

function hasFirstName(req, res, next) {
  const name = req.body.data.first_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "first_name property required.",
  })
}

function hasLastName(req, res, next) {
  const name = req.body.data.last_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "last_name property required.",
  })
}

function validStatus(req, res, next) {
  const status = req.body.data.status;
  if (status !== "seated" && status !== "finished") {
    return next();
  }
  next({
    status: 400,
    message: "status cannot be seated, finished.",
  })
}

function hasMobileNumber(req, res, next) {
  const phone = req.body.data.mobile_number;
  if (phone) {
    return next();
  }
  next({
    status: 400,
    message: "mobile_number property required.",
  })
}

function hasReservationDate(req, res, next) {
  const date = req.body.data.reservation_date;
  if (date) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date property required.",
  })
}

function hasReservationTime(req, res, next) {
  const time = req.body.data.reservation_time;
  if (time && typeof time === "string") {
    return next();
  }
  next({
    status: 400,
    message: "valid reservation_time property required.",
  })
}

async function list(req, res) {
  const { date, currentDate, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({data});
  } else if (currentDate) {
    const data = await service.listByDate(currentDate);
    res.json({data});
  } else {
    const data = await service.list();
    res.json({data});
  }
}

async function create(req, res) {
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({data});
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    validStatus,
    hasReservationTime,
    asyncErrorBoundary(create)
  ]
};
