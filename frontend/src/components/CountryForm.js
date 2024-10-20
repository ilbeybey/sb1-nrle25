import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function CountryForm() {
  const [country, setCountry] = useState({ id: '', name: '', image: '', description: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id !== 'new') {
      const fetchCountry = async () => {
        const response = await axios.get(`http://localhost:3000/api/countries/${id}`);
        setCountry(response.data);
      };
      fetchCountry();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (id === 'new') {
      await axios.post('http://localhost:3000/api/countries', country, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } else {
      await axios.put(`http://localhost:3000/api/countries/${id}`, country, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
    history.push('/countries');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={country.id} onChange={(e) => setCountry({...country, id: e.target.value})} placeholder="ID" required />
      <input type="text" value={country.name} onChange={(e) => setCountry({...country, name: e.target.value})} placeholder="Name" required />
      <input type="text" value={country.image} onChange={(e) => setCountry({...country, image: e.target.value})} placeholder="Image URL" required />
      <textarea value={country.description} onChange={(e) => setCountry({...country, description: e.target.value})} placeholder="Description" required />
      <button type="submit">Save</button>
    </form>
  );
}

export default CountryForm;