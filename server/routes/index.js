// Routes
import { category } from "./categories/index.js";
import { inventory } from "./inventory/index.js";
import { login } from "./login/index.js";
import { product } from "./product/index.js";
import { user } from "./user/index.js";
import { customer } from "./customer/index.js";
import { country } from "./countries/index.js";
import { visit } from "./visit/index.js";
import { seller } from "./seller/index.js";

export default function loadRoutes(server) {
  inventory(server);
  login(server);
  product(server);
  user(server);
  category(server);
  customer(server);
  country(server);
  visit(server);
  seller(server);
}
