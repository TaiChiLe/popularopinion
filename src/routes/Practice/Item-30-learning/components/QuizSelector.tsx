import { Select } from 'antd';

type QuizSelectorProps = {
  quizes: Array<any>;
  selectedIndex: number;
  onChange: (value: number) => void;
};

export default function QuizSelector(props: QuizSelectorProps) {
  const { onChange, selectedIndex, quizes } = props;
  const handleChange = (value: number) => {
    onChange(value);
  };
  return (
    <Select
      value={selectedIndex}
      style={{ width: 200 }}
      onChange={handleChange}
      options={[
        { value: -1, label: '-- Select Quiz --', disabled: true },
        ...quizes.map((quiz, index) => ({
          value: index,
          label: quiz.title,
        })),
      ]}
    />
  );
}
