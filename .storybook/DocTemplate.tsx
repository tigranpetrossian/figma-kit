import React from 'react';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { useOf } from '@storybook/blocks';

export const RadixNotice = () => {
  const resolvedOf = useOf('story');

  if (resolvedOf.type === 'story' && resolvedOf.story?.parameters?.radixComponent === true) {
    return <div>Radix notice here</div>;
  }

  return null;
};

export const DocTemplate = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <RadixNotice />
      <Primary />
      <Controls />
      <Stories />
    </>
  );
};
