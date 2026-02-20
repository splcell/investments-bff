import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { Error as MongooseError } from "mongoose";
import { transformError } from "../helpers/transform-error";
import { BadRequestError } from "../errors/bad-request-error";
import { ConflictError } from "../errors/conflict-error";
import "dotenv/config";
import ForbiddenError from "../errors/forbidden-error";
import { NotFoundError } from "../errors/not-found-error";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;

  try {
    const newUser = await User.create(user);

    const token = newUser.generateAccessToken();

    res
      .status(201)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3600000,
      })
      .send({ id: newUser._id });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      return next(new BadRequestError(errors[0].message));
    }

    if ((error as Error).message.startsWith("E11000")) {
      return next(new ConflictError("User with this email already exists"));
    }

    console.error("CREATE USER ERROR:", error);

    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = user.generateAccessToken();

    res
      .status(201)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3600000,
      })
      .send({ mesage: "ok" });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", { httpOnly: true }).json({ message: "ok" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const returnedUser = await User.findById(user.id);

  res.json(returnedUser);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, email, username, password } = req.body;
  const userId = res.locals.user.id;

  console.log(req.body, "user")

  try {
    if (id !== userId.id) {
      return next(new ForbiddenError("You have no access to this resource"));
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(new NotFoundError("Not Found"));
    }

    // обновляем только разрешённые поля
    const updateData: any = {};

    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) updateData.password = password;

    currentUser.set(updateData);

    await currentUser.save();

    return res.send({ message: "ok" });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(new BadRequestError("Invalid Id"));
    }

    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      return next(new BadRequestError(errors[0].message));
    }

    return next(error);
  }
};


export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.id;
  const currentUser = res.locals.user;

  try {
    if (userId !== currentUser.id) {
      next(new ForbiddenError("You have no access to this resource"));
    }

    await User.findByIdAndDelete(currentUser);

    res.send({ message: "ok" });
  } catch (error) {
    next(error);
  }
};
