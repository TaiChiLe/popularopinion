import { Button, Card, Divider } from 'antd';
import styles from './TodolistDisplay.module.css';
import { useState } from 'react';
import TodolistEditModal from './TodolistEditModal';

type TodolistDisplay = {
  todoListData: [];
  setTodoListData: ([]) => void;
  tags: [];
  searchQuery: string;
};

export default function TodolistDisplay(props: TodolistDisplay) {
  const { todoListData, setTodoListData, tags, searchQuery } = props;
  const [menuVisible, setmenuVisible] = useState({});
  const [editModalVsible, setEditModalVsible] = useState({});

  const onMenuButtonClick = (index: number) => {
    setmenuVisible({ ...menuVisible, [index]: !menuVisible[index] });
  };

  const onDeleteButtonClick = (itemIndex: number) => {
    todoListData.splice(itemIndex, 1);
    setTodoListData([...todoListData]);

    setmenuVisible({ ...menuVisible, [itemIndex]: false });
  };

  const onEditButtonClick = (index: number) => {
    setEditModalVsible({
      ...editModalVsible,
      [index]: !editModalVsible[index],
    });
  };

  const visibleTodoList = todoListData.filter((item) => {
    if (!searchQuery) {
      return item;
    }

    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {visibleTodoList.map((todoListItem, index) => (
        <div key={index} className={styles.container}>
          <div
            className={`${styles.menu} ${
              menuVisible[index] ? '' : styles.hidden
            }`}
          >
            <Button onClick={() => onEditButtonClick(index)}>Edit</Button>
            <Button onClick={() => onDeleteButtonClick(index)}>Delete</Button>
          </div>
          <Button
            onClick={() => onMenuButtonClick(index)}
            className={styles.button}
          >
            ...
          </Button>
          <Card className={styles.card} title={todoListItem.title}>
            <p>{todoListItem.description}</p>
            <Divider></Divider>
            {todoListItem.tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
          </Card>
          {editModalVsible[index] && (
            <TodolistEditModal
              isModalOpen={editModalVsible}
              setIsModalOpen={setEditModalVsible}
              setTodoListData={setTodoListData}
              todoListData={todoListData}
              todoListDataIndex={index}
              tags={tags}
            />
          )}
        </div>
      ))}
    </>
  );
}
