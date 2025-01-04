import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [orderHistory, setOrderHistory] = useState('');

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/suppliers/')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);

  
  const handleCreateSupplier = (e) => {
    e.preventDefault();

    const newSupplier = {
      name,
      email,
      phone_number: phone,
      contact_info: contactInfo,
      order_history: orderHistory,
    };

    axios.post('http://localhost:8000/api/suppliers/', newSupplier)
      .then(response => {
        setSuppliers([...suppliers, response.data]);
        setName('');
        setEmail('');
        setPhone('');
        setContactInfo('');
        setOrderHistory('');
      })
      .catch(error => {
        console.error('Error creating supplier:', error);
      });
  };

  return (
    <div>
      <h1>Supplier Management</h1>

      {/* Supplier Form */}
      <form onSubmit={handleCreateSupplier}>
        <input
          type="text"
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Supplier Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <textarea
          placeholder="Order History"
          value={orderHistory}
          onChange={(e) => setOrderHistory(e.target.value)}
        />
        <button type="submit">Add Supplier</button>
      </form>

      {/* Supplier List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Contact Info</th>
            <th>Order History</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone_number}</td>
              <td>{supplier.contact_info}</td>
              <td>{supplier.order_history}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierPage;
