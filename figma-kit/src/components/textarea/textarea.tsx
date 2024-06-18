import React from 'react';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';
import TextareaAutoSize from 'react-textarea-autosize';
import { cx } from 'class-variance-authority';

type TextareaElement = React.ElementRef<'textarea'>;
type TextareaProps = TextareaAutosizeProps;

const Textarea = React.forwardRef<TextareaElement, TextareaProps>((props, ref) => {
  const { className, ...textareaProps } = props;
  return <TextareaAutoSize className={cx(className, 'fp-textarea')} ref={ref} {...textareaProps} />;
});

export type { TextareaProps };
export { Textarea };
