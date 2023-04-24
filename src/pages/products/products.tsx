import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
  
const mock = {
  id: "1",
  name: "Product 1",
  sku: "SKU12913131",
  array: [],
  type: [],
  temperature_control: 25,
  expiration_date: Date.now(),
  fragility_conditions: "None",
  description: "Description",
  status: true,
  price: 1500,
  img_url: 'http://url.com',
  suppliers: 'Zaragosa',
  category: {},
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Products() {
  return (
    <>
    Productos
    </>
  );
}

type Product = {
    id: string,
    name: string,
    sku: string,
    temperature_control: number,
    expiration_date: Date,
    fragility_conditions: string,
    description: string,
    status: boolean,
    price: number,
    img_url: string,
    suppliers: string,
  };
