import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
  title: 'Components / Footer',
  component: Footer,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},

  args: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFooter: Story = {
  args: {
    title: {
      value: 'aajsiodjaiosjdoi',
    },
  },
  render: (args) => {
    return (
      <div>
        <Footer {...args} />
      </div>
    );
  },
  decorators: [withRouter],
};

export const SecondaryFooter: Story = {
  args: {
    title: {
      value: 'test',
    },
  },
  render: (args) => {
    return (
      <div>
        <Footer {...args} />
      </div>
    );
  },
  decorators: [withRouter],
};
