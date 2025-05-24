import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Select } from 'antd';

export default function Item22bak() {
  const [countries, setCountries] = useState([]);

  const handleChange = (value: string) => {
    alert(`selected ${value}`);
  };

  const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    setCountries(data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className={styles.container}>
      {countries && (
        <Select
          defaultValue="Australia"
          onChange={handleChange}
          options={countries.map((country) => ({
            value: country.name.common,
            label: `${country.flag} ${country.name.common}`,
          }))}
        />
      )}
    </div>
  );
}
