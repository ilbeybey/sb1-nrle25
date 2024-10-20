import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('http://localhost:3000/api/countries');
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <Link to="/countries/new">Add New Country</Link>
      <ul>
        {countries.map(country => (
          <li key={country.id}>
            <Link to={`/countries/${country.id}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;