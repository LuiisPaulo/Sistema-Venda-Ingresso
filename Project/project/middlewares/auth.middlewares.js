const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

exports.auth = async (req, res, next) => {
    const token = 