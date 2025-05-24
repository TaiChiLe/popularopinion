import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import type { GetProp } from 'antd';

type TodolistaddProps = {
  setTodoListData: ([]) => void;
  todoListData: [];
  tags: [];
};
export default function TodolistAdd(props: TodolistaddProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTodoListData, todoListData, tags } = props;
  let selectedTags = [];
  let title = useRef(null);
  let description = useRef(null);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log('checked = ', checkedValues);
    selectedTags = checkedValues;
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    setTodoListData([
      ...todoListData,
      {
        title: title.current.input.value,
        description: description.current.input.value,
        tags: selectedTags,
      },
    ]);
    console.log(todoListData);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        +
      </Button>
      <Modal
        title="Add To Do"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form preserve={false}>
          <div>Title</div>
          <Input ref={title}></Input>
          <div>Description</div>
          <Input ref={description}></Input>
          <div>Categories</div>
          <Checkbox.Group options={tags} onChange={onChange} />
        </Form>
      </Modal>
    </>
  );
}
