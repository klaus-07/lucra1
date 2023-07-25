const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User, Admin } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    console.log('payload', payload);
    const user = await User.findOne({ where: { id: payload.sub } });
    console.log('user :::::::', user);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};
const jwtAdminVerify = async (payload, done) => {
  console.log('1');
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await Admin.findOne({ where: { id: payload.sub } });
    console.log('user---------------- :::::::::', user);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    console.log('2');
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const jwtAdminStrategy = new JwtStrategy(jwtOptions, jwtAdminVerify);

module.exports = {
  jwtStrategy,
  jwtAdminStrategy,
};
