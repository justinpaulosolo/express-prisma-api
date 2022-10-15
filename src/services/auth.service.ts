import bcrypt from "bcryptjs";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../utils/prisma";
import HttpException from "../models/http-exception.model";
import { UserRegisterModel } from "../models/user-register.model";
import { LoginUserModel } from "../models/user-login.model";
import generateToken from "../utils/token.utils";
import { on } from "events";

const localOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false,
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const localStrategy = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    console.log("localStrategy --->", email, password);
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return done(new HttpException(401, "Invalid email or password"), false);
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return done(new HttpException(401, "Invalid email or password"), false);
      }

      const token = await generateToken({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      const authedUser = {
        id: user.id,
        email: user.email,
        token,
      };

      return done(null, authedUser);
    } catch (error) {
      return done(error, false);
    }
  }
);

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  console.log("jwtStrategy --->", payload);
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  console.log(user, "jwtStrategy --->");
  if (user) return done(null, user);
  else return done(null, false);
});

export const registerUser = async (model: UserRegisterModel) => {
  const firstName = model.firstName?.trim();
  const lastName = model.lastName?.trim();
  const username = model.username?.trim();
  const email = model.email?.trim();

  if (!firstName)
    throw new HttpException(422, {
      errors: { firstName: "First name is required" },
    });

  if (!lastName)
    throw new HttpException(422, {
      errors: { firstName: "Last name is required" },
    });

  if (!username)
    throw new HttpException(422, {
      errors: { firstName: "Username is required" },
    });

  if (!email)
    throw new HttpException(422, {
      errors: { firstName: "Email is required" },
    });

  const hashedPassword = await bcrypt.hash(model.password, 12);
  return await prisma.user.create({
    data: { ...model, password: hashedPassword },
    select: {
      id: true,
    },
  });
};

export const loginUser = async (model: LoginUserModel) => {
  return model;
};

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });
