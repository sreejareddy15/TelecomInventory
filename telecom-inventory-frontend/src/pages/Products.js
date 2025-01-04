import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [reorderPoint, setReorderPoint] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      stock,
      reorder_point: reorderPoint
    };

    axios.post('http://localhost:8000/api/products/', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setName('');
        setCategory('');
        setStock('');
        setReorderPoint('');
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Product Form */}
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Level"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reorder Point"
          value={reorderPoint}
          onChange={(e) => setReorderPoint(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Reorder Point</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.reorder_point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;
