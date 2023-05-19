import { rest } from 'msw'

export const countries = ["Colombia"];
export const cities = ["Bogota"];

export const handlers = [
  rest.post('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/countries', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countries))
  }),

  rest.get('/api/countries//cities', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cities))
  }),

  rest.post('/api/customers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.put('/api/products/123456789/inventories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.post('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('api/customers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/sellers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),

  rest.get('/api/visits', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
]