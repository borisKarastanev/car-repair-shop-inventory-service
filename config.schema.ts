import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  DB_PORT: Joi.number().default(5432).required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
