import { CSSProperties } from 'react';

export function sum(a: number, b: number): number {
  return a + b;
}

type Person = {
  name: string;
  age: number;
  hobbies: Array<string>;
};
const person: Person = {
  name: 'Alice',
  age: 30,
  hobbies: ['reading', 'swimming'],
};
person.hobbies.toLowerCase();
person.name.map((letter) => letter.toUpperCase());

type MyImageProps = {
  width: number;
  height: number;
  person?: Person | false;
  position?: [number, number];
  style?: CSSProperties;
};

function MyImage(props: MyImageProps) {
  return <img width={props.width} height={props.height} style={props.style} />;
}

function App() {
  return <MyImage width={400} height={400} />;
}
