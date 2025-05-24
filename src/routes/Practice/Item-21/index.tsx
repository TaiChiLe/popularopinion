import styles from './index.module.css';
import { Select } from 'antd';

let countries = [
  {
    name: {
      common: 'Australia',
    },
    flag: '🇦🇺',
  },
  {
    name: {
      common: 'Germany',
    },
    flag: '🇩🇪',
  },
  {
    name: {
      common: 'Japan',
    },
    flag: '🇯🇵',
  },
];

export default function Item21() {
  const handleChange = (value: string) => {
    alert(`selected ${value}`);
  };

  return (
    <div className={styles.container}>
      <Select
        defaultValue="Australia"
        onChange={handleChange}
        options={countries.map((country) => ({
          value: country.name.common,
          label: `${country.flag} ${country.name.common}`,
        }))}
      />
    </div>
  );
}
