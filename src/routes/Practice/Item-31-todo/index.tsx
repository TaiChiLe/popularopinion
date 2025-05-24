import { useState } from 'react';
import TodolistDisplay from './components/TodolistDisplay';
import styles from './index.module.css';
import Title from 'antd/es/typography/Title';
import TodolistAdd from './components/TodolistAdd';
import TagDisplay from './components/TagDisplay';
import { Input } from 'antd';

// 25 items
// filter -> 3 items -> this is what they see, is it necessary to save what they see as our result?
// remove search -> How can you get back the 25 items
export default function Item31todo() {
  const [todoListData, setTodoListData] = useState([]);
  const [tags, setTag] = useState(['Work', 'School', 'Study']);
  const [searchQuery, setSearchQuery] = useState('');

  const search = (value) => {
    console.log(value.target.value);

    setSearchQuery(value.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles['tag-section']}>
        <Title>Todo</Title>

        <TagDisplay todolistData={todoListData} tags={tags}></TagDisplay>
      </div>
      <div>
        <Input onChange={search}></Input>
        <TodolistAdd
          todoListData={todoListData}
          setTodoListData={setTodoListData}
          tags={tags}
        ></TodolistAdd>

        <TodolistDisplay
          setTodoListData={setTodoListData}
          todoListData={todoListData}
          tags={tags}
          searchQuery={searchQuery}
        ></TodolistDisplay>
      </div>
    </div>
  );
}
