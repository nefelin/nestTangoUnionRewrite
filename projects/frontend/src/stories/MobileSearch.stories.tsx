import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MobileSearch from '../components/MobileSearch';
import { selectOptions } from './queries/selectOptions';

export default {
  title: 'Pages/Mobile/Search',
  component: MobileSearch,
  parameters: {},
} as ComponentMeta<typeof MobileSearch>;

const Template: ComponentStory<typeof MobileSearch> = (args) => {
  return (
    <div>
      <MobileSearch {...args}/>
    </div>
  );
};

export const Init = Template.bind({});
Init.args = {
 selectOptions: selectOptions
};
