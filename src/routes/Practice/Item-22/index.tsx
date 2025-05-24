import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Select, Spin } from 'antd';

export default function Item22() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (value: string) => {
    alert(`selected ${value}`);
  };

  const fetchCountries = async () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((response) => {
        setCountries(response);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <Select
          defaultValue="Australia"
          onChange={handleChange}
          options={countries.map((country) => ({
            value: country.name.common,
            label: `${country.flag} ${country.name.common}`,
          }))}
        />
      )}
      {loading && <Spin />}
    </div>
  );
}
