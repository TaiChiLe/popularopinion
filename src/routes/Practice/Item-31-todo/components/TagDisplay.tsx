import { Button } from 'antd';
import { useEffect, useState } from 'react';
import styles from './TagDisplay.module.css';

type tagDisplayProps = {
  tags: [];
  todolistData: [];
};

export default function TagDisplay(props: tagDisplayProps) {
  const { tags, todolistData } = props;
  const [tagCount, setTagCount] = useState({});

  useEffect(() => {
    for (let i = 0; i < tags.length; i++) {
      tagCount[i] = 0;
      for (let j = 0; j < todolistData.length; j++) {
        for (let k = 0; k < todolistData[j].tags.length; k++) {
          if (todolistData[j].tags[k] === tags[i]) {
            tagCount[i] = tagCount[i] + 1;
            setTagCount({ ...tagCount });
          }
        }
      }
    }
  }, [todolistData, tagCount]);

  return (
    <>
      {tags.map((tag, index) => (
        <Button key={index}>
          {tag} ({tagCount[index]}){' '}
        </Button>
      ))}
      <div>
        <Button className={styles['add-tag-button']}>Add Tag</Button>
      </div>
    </>
  );
}
