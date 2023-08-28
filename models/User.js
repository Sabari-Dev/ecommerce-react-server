import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "Username at-least have 3 characters"],
    },
    email: {
      type: String,
      validate: {
        validator: function (mail) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
        },
        message: (props) => `${props.value} is not a valid Email-id!`,
      },
      required: [true, "User Email is required"],
    },
    password: {
      type: String,
      validate: {
        validator: function (pass) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);
        },
        message: `At least 8 characters long,
Contains at least one uppercase letter,
Contains at least one lowercase letter,
Contains at least one digit,
Allows special characters`,
      },
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
