import React from 'react';
import { IconButton, Link, Text, Tooltip } from '../figma-kit/src';
import { StoryContext } from '@storybook/react';

const StoryLayout = (props: { children: React.ReactNode; context: StoryContext }) => {
  const { children, context } = props;
  const shouldRenderRadixNotice = context.parameters.radixUrl && context.parameters.radixComponentName;

  return (
    <div className="story-layout">
      {shouldRenderRadixNotice && (
        <RadixNotice name={context.parameters.radixComponentName} url={context.parameters.radixUrl} />
      )}
      <div>{children}</div>
    </div>
  );
};

const RadixNotice = ({ name, url }: { name: string; url: string }) => {
  return (
    <div>
      <div className="radix-notice">
        <Text block>
          Based on{' '}
          <Link className="radix-link" target="_blank" href={url}>
            Radix {name}
            <LinkIcon />
          </Link>
        </Text>
        <Tooltip
          collisionPadding={16}
          delayDuration={0}
          content={
            <div>
              This component is built using the {name} primitive from Radix UI. <br />
              Familiarity with Radix Primitives is recommended
            </div>
          }
        >
          <IconButton disableTooltip aria-label="Info" style={{ marginLeft: 4 }}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="var(--color-icon-secondary)"
      d="M8 14C11.314 14 14 11.314 14 8C14 4.686 11.314 2 8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14ZM8 13C5.054 13 3 10.946 3 8C3 5.054 5.054 3 8 3C10.946 3 13 5.054 13 8C13 10.946 10.946 13 8 13ZM7.5 7.333H8.5V11.333H7.5V7.333ZM7.334 5.333C7.334 4.965 7.632 4.667 8.001 4.667C8.369 4.667 8.667 4.965 8.667 5.333C8.667 5.702 8.369 6 8.001 6C7.632 6 7.334 5.702 7.334 5.333Z"
    />
  </svg>
);

export { StoryLayout };
