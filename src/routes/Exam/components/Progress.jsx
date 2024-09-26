import React from 'react';
import { Steps } from 'antd';
const Progress = () => (
  <Steps
    size="small"
    current={1}
    items={[
      {
        title: 'Fill in transfer info',
      },
      {
        title: 'Confirm transfer info',
      },
      {
        title: 'Done',
      },
    ]}
  />
);
export default Progress;
