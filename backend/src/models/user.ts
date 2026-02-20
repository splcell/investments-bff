import { compare, genSalt, hash } from "bcryptjs";
import { Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import NotAuthorizedError from "../errors/not-authorized-error";

interface User {
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  generateAccessToken: () => string;
}

interface UserDoc extends Document, User {}

interface UserModel extends Model<UserDoc> {
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<UserDoc | never>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email must be uniq"],
      required: [true, "Email is required"],
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          return emailRegExp.test(value);
        },

        message: "Email is not valid",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "The password cannot be shorter than 6 characters"],
      select: false,
    },

    username: {
      type: String,
      unique: [true, "Username must be uniq"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await genSalt(10);
      const hashed = await hash(this.password, salt); // хэширование
      this.password = hashed;
    }
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string,
) {
  const user = await this.findOne({ email })
    .select("+password")
    .orFail(() => new NotAuthorizedError());

  const isCorrectPassword = await compare(password, user.password);

  if (isCorrectPassword) {
    return user;
  }

  throw new NotAuthorizedError("Invalid Credentials");
};

const User = model<User, UserModel>("user", userSchema);

export default User;
