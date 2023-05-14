import { rest } from 'msw'

export const user = [];
export const customer = [];
export const countries = ["Colombia"];
export const cities = ["Bogota"];

export const handlers = [
  rest.post('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user))
  }),

  rest.get('/api/countries', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countries))
  }),

  rest.get('/api/countries//cities', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cities))
  }),

  rest.post('/api/customers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(customer))
  }),
]