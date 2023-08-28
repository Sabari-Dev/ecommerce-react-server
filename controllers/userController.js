import User from "../models/User.js";

//create User
export const createUser = (req, res) => {
  new User(req.body)
    .save()
    .then((user) => {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    })
    .catch((err) => res.status(400).json({ success: false, message: err }));
};

//get all users
export const getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json({ success: true, users: users }))
    .catch((err) => res.status(400).json({ success: false, message: err }));
};

//getUser
export const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res
        .status(201)
        .json({ success: true, message: "search success!!", user: user });
    })
    .catch((err) => res.status(400).json({ success: false, message: err }));
};

//delete User
export const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) =>
      res
        .status(201)
        .json({ success: true, message: "user deleted successfully" })
    )
    .then((err) => res.status(400).json({ success: false, message: err }));
};

//update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, gender, dateOfBirth } = req.body;
  await User.findByIdAndUpdate(id, {
    name: name,
    email: email,
    password: password,
    gender: gender,
    dateOfBirth: dateOfBirth,
  })
    .then(
      res
        .status(200)
        .json({ success: true, message: "user details updated successfully" })
    )
    .catch((err) => res.status(400).json({ success: false, message: err }));
};
