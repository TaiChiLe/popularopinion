import { Select } from 'antd';

export default function Settings(props) {
  const { service } = props;
  const handleChange = (value: number) => {
    service.rate(value);
  };

  return (
    <>
      <Select
        defaultValue={1.0}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 1.0, label: '1.0' },
          { value: 1.5, label: '1.5' },
          { value: 2.0, label: '2.0' },
        ]}
      />
    </>
  );
}
