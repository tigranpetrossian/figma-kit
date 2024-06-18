import React from 'react';

type TemplateNameElement = React.ElementRef<'div'>;
type TemplateNameProps = {};

const TemplateName = React.forwardRef<TemplateNameElement, TemplateNameProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});

export type { TemplateNameProps };
export { TemplateName };
