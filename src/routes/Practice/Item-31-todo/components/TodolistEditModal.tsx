import { Checkbox, Form, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import type { GetProp } from 'antd';

type TodolistaddProps = {
  setTodoListData: ([]) => void;
  isModalOpen: any;
  setIsModalOpen: any;
  todoListData: [];
  todoListDataIndex: number;
  tags: [];
};

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
}

export default function TodolistEditModal(props: TodolistaddProps) {
  const {
    setTodoListData,
    todoListData,
    todoListDataIndex,
    setIsModalOpen,
    isModalOpen,
    tags,
  } = props;
  let title = useRef(null);
  let description = useRef(null);
  let selectedTags = todoListData[todoListDataIndex].tags;

  const [fields, setFields] = useState<FieldData[]>([
    { name: ['title'], value: todoListData[todoListDataIndex].title },
    {
      name: ['description'],
      value: todoListData[todoListDataIndex].description,
    },
    { name: ['checkboxes'], value: todoListData[todoListDataIndex].tags },
  ]);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log('checked = ', checkedValues);
    selectedTags = checkedValues;
  };

  const handleCancel = () => {
    setIsModalOpen({ ...isModalOpen, [todoListDataIndex]: false });
  };

  const handleOk = () => {
    setIsModalOpen({ ...isModalOpen, [todoListDataIndex]: false });
    todoListData[todoListDataIndex].title = title.current.input.value;
    todoListData[todoListDataIndex].description =
      description.current.input.value;
    todoListData[todoListDataIndex].tags = selectedTags;

    setTodoListData([...todoListData]);
  };

  return (
    <>
      <Modal
        title="Add To Do"
        open={isModalOpen}
        onOk={handleOk}
        okText="Save Edit"
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form fields={fields} name="global_state">
          <div>Title</div>
          <Form.Item name="title">
            <Input ref={title}></Input>
          </Form.Item>
          <div>Description</div>
          <Form.Item name="description">
            <Input ref={description}></Input>
          </Form.Item>
          <div>Categories</div>
          <Form.Item name="checkboxes">
            <Checkbox.Group options={tags} onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
