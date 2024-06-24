import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import * as Dialog from './dialog';

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/dialog',
    radixComponentName: 'Dialog',
    docs: {
      subtitle: 'Dialog box with optional modality.',
    },
  },
};

const OnboardingIllustration = () => {
  return (
    <svg
      width="352"
      height="192"
      viewBox="0 0 352 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <g clipPath="url(#clip0_0_20242)">
        <rect width="352" height="192" fill="#333333" style={{ fill: '#333333', fillOpacity: 1 }} />
        <rect
          x="25"
          y="33"
          width="206"
          height="126"
          stroke="white"
          style={{ stroke: 'white', strokeOpacity: 1 }}
          strokeWidth="2"
        />
        <path d="M25 48H231" stroke="white" style={{ stroke: 'white', strokeOpacity: 1 }} strokeWidth="2" />
        <path d="M72 48V159" stroke="white" style={{ stroke: 'white', strokeOpacity: 1 }} strokeWidth="2" />
        <path d="M184 48V159" stroke="white" style={{ stroke: 'white', strokeOpacity: 1 }} strokeWidth="2" />
        <path
          d="M258.544 47L259.746 43.5355H264.859L266.055 47H268.151L263.44 33.9091H261.158L256.447 47H258.544ZM260.321 41.8736L262.251 36.2869H262.354L264.284 41.8736H260.321ZM269.934 47H271.8V45.4723H271.96C272.305 46.0987 273.008 47.1918 274.798 47.1918C277.176 47.1918 278.902 45.2869 278.902 42.1101C278.902 38.9268 277.15 37.054 274.779 37.054C272.957 37.054 272.299 38.1662 271.96 38.7734H271.845V33.9091H269.934V47ZM271.807 42.0909C271.807 40.0391 272.701 38.6776 274.37 38.6776C276.102 38.6776 276.971 40.1413 276.971 42.0909C276.971 44.0597 276.076 45.5618 274.37 45.5618C272.727 45.5618 271.807 44.1555 271.807 42.0909ZM285.076 47.1982C287.396 47.1982 288.898 45.8047 289.109 43.8935H287.249C287.006 44.9545 286.181 45.581 285.088 45.581C283.471 45.581 282.429 44.2322 282.429 42.0909C282.429 39.9879 283.49 38.6648 285.088 38.6648C286.303 38.6648 287.044 39.4318 287.249 40.3523H289.109C288.904 38.3707 287.287 37.054 285.056 37.054C282.289 37.054 280.499 39.1378 280.499 42.1357C280.499 45.0952 282.225 47.1982 285.076 47.1982ZM300.277 33.9091H298.436C298.366 34.267 297.369 35.9226 295.458 35.9226V37.5462C296.941 37.5462 297.97 36.9581 298.187 36.5746H298.296V47H300.277V33.9091ZM303.706 47H312.322V45.3061H306.429V45.2102L309.03 42.4872C311.427 40.0646 312.111 38.9077 312.111 37.4439C312.111 35.3409 310.398 33.7301 307.931 33.7301C305.483 33.7301 303.693 35.3153 303.693 37.706H305.578C305.572 36.2997 306.48 35.3793 307.892 35.3793C309.222 35.3793 310.232 36.1974 310.232 37.5014C310.232 38.6584 309.541 39.4893 308.135 40.9787L303.706 45.5682V47ZM319.194 47.179C321.866 47.179 323.828 45.581 323.822 43.4077C323.828 41.7521 322.825 40.5632 321.086 40.2947V40.1925C322.454 39.8409 323.343 38.767 323.336 37.2969C323.343 35.3729 321.764 33.7301 319.245 33.7301C316.842 33.7301 314.911 35.1811 314.848 37.3097H316.759C316.804 36.108 317.935 35.3793 319.22 35.3793C320.556 35.3793 321.431 36.1911 321.425 37.3991C321.431 38.6648 320.415 39.4957 318.964 39.4957H317.858V41.1065H318.964C320.779 41.1065 321.828 42.027 321.828 43.3438C321.828 44.6158 320.722 45.4787 319.181 45.4787C317.762 45.4787 316.657 44.75 316.58 43.5866H314.573C314.656 45.7216 316.548 47.179 319.194 47.179Z"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
        />
        <path
          d="M261.727 73C265.716 73 268.081 70.5327 268.081 66.4418C268.081 62.3636 265.716 59.9091 261.817 59.9091H257.291V73H261.727ZM259.663 70.9482V61.9609H261.683C264.342 61.9609 265.729 63.4439 265.729 66.4418C265.729 69.4524 264.342 70.9482 261.612 70.9482H259.663ZM274.47 73.1918C276.759 73.1918 278.331 72.0732 278.74 70.3665L276.58 70.1236C276.267 70.9545 275.5 71.3892 274.502 71.3892C273.007 71.3892 272.016 70.4048 271.997 68.7237H278.836V68.0142C278.836 64.5689 276.765 63.054 274.349 63.054C271.537 63.054 269.702 65.1186 269.702 68.1484C269.702 71.2294 271.511 73.1918 274.47 73.1918ZM272.003 67.1641C272.073 65.9112 273 64.8565 274.381 64.8565C275.711 64.8565 276.605 65.8281 276.618 67.1641H272.003ZM285.723 63.1818H283.684V62.4084C283.684 61.6413 284.003 61.2131 284.866 61.2131C285.231 61.2131 285.537 61.2962 285.729 61.3537L286.196 59.5639C285.895 59.4616 285.237 59.2955 284.438 59.2955C282.731 59.2955 281.37 60.2734 281.37 62.255V63.1818H279.919V64.9716H281.37V73H283.684V64.9716H285.723V63.1818ZM291.528 70.571H297.773V73H300.036V70.571H301.711V68.6214H300.036V59.9091H297.083L291.528 68.6854V70.571ZM297.799 68.6214H293.957V68.5192L297.696 62.5938H297.799V68.6214ZM308.196 73.179C310.964 73.179 312.894 71.2997 312.894 68.6982C312.894 66.1797 311.143 64.3643 308.765 64.3643C307.704 64.3643 306.764 64.7862 306.278 65.3615H306.202L306.579 61.8906H312.21V59.9091H304.616L303.932 66.6591L306.074 67.0107C306.515 66.5249 307.346 66.1989 308.132 66.2053C309.57 66.2116 310.606 67.2727 310.599 68.7557C310.606 70.2195 309.596 71.2614 308.196 71.2614C307.013 71.2614 306.061 70.5135 305.978 69.4396H303.677C303.741 71.6129 305.639 73.179 308.196 73.179ZM319.721 73.179C322.547 73.1982 324.445 71.255 324.439 68.6662C324.445 66.1925 322.681 64.4027 320.386 64.4027C318.98 64.4027 317.74 65.0866 317.114 66.2116H317.024C317.03 63.4183 318.04 61.7436 319.856 61.7436C320.981 61.7436 321.741 62.402 321.984 63.4375H324.317C324.036 61.2898 322.329 59.6918 319.856 59.6918C316.711 59.6918 314.723 62.3125 314.723 66.8253C314.723 71.6257 317.209 73.1662 319.721 73.179ZM319.709 71.2614C318.309 71.2614 317.286 70.1044 317.28 68.7365C317.293 67.3622 318.354 66.2116 319.741 66.2116C321.128 66.2116 322.144 67.3111 322.138 68.7173C322.144 70.1491 321.096 71.2614 319.709 71.2614Z"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
        />
        <rect
          x="256"
          y="117"
          width="18"
          height="18"
          rx="9"
          fill="#18A0FB"
          style={{ fill: '#18A0FB', fillOpacity: 1 }}
        />
        <rect
          x="282"
          y="117"
          width="18"
          height="18"
          rx="9"
          fill="#1BC47D"
          style={{ fill: '#1BC47D', fillOpacity: 1 }}
        />
        <rect
          x="282"
          y="143"
          width="18"
          height="18"
          rx="9"
          fill="#7B61FF"
          style={{ fill: '#7B61FF', fillOpacity: 1 }}
        />
        <rect
          x="308"
          y="143"
          width="18"
          height="18"
          rx="9"
          fill="#F24822"
          style={{ fill: '#F24822', fillOpacity: 1 }}
        />
        <rect x="256" y="143" width="18" height="18" rx="9" fill="white" style={{ fill: 'white', fillOpacity: 1 }} />
        <rect
          x="308"
          y="117"
          width="18"
          height="18"
          rx="9"
          fill="#FFEB00"
          style={{ fill: '#FFEB00', fillOpacity: 1 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M265 99C262.7 99 260.678 97.8058 259.522 96C260.678 94.1942 262.7 93 265 93C267.3 93 269.322 94.1942 270.479 96C269.322 97.8058 267.3 99 265 99ZM265 92C267.878 92 270.378 93.6211 271.635 96C270.378 98.3789 267.878 100 265 100C262.122 100 259.623 98.3789 258.365 96C259.623 93.6211 262.122 92 265 92ZM265 98C266.105 98 267 97.1046 267 96C267 94.8954 266.105 94 265 94C263.896 94 263 94.8954 263 96C263 97.1046 263.896 98 265 98Z"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M296.509 95.8012C297.064 95.2736 297.544 94.6672 297.93 94H296.745C295.48 95.8142 293.378 97 291 97C288.622 97 286.52 95.8142 285.254 94H284.07C284.456 94.6673 284.936 95.2737 285.491 95.8013L283.896 97.3962L284.604 98.1033L286.261 96.4459C286.972 96.9693 287.772 97.378 288.635 97.6447L288.018 99.866L288.982 100.134L289.608 97.8793C290.06 97.9586 290.525 98 291 98C291.475 98 291.94 97.9586 292.392 97.8793L293.018 100.134L293.982 99.866L293.365 97.6447C294.228 97.3781 295.028 96.9693 295.739 96.4458L297.396 98.1033L298.104 97.3962L296.509 95.8012Z"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M312 104L312 101H309V100H312L312 92H309V91H312L312 88H313L313 91H321V88H322V91H325V92H322L322 100H325V101H322V104H321V101H313L313 104H312ZM321 100L321 92H313L313 100H321Z"
          fill="white"
          style={{ fill: 'white', fillOpacity: 1 }}
        />
      </g>
      <defs>
        <clipPath id="clip0_0_20242">
          <rect width="352" height="192" fill="white" style={{ fill: 'white', fillOpacity: 1 }} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content overlay>
          <Dialog.Header>
            <Dialog.Title>
              <div>dogs</div>
            </Dialog.Title>
            <Dialog.Controls>
              <Dialog.Close />
            </Dialog.Controls>
          </Dialog.Header>
          <OnboardingIllustration />
          <Dialog.Section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button>Next</Button>
            </div>
          </Dialog.Section>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};

export const Root: Story = {
  argTypes: {
    defaultOpen: {
      type: 'boolean',
      description:
        'The state of the dialog when it is initially rendered. Use when you do not need to control its state.',
    },
    open: {
      type: 'boolean',
      description: 'The controlled state of the dialog. Must be used in conjunction with onOpenChange.',
    },
    onOpenChange: {
      type: 'function',
      description: 'Event handler called when the open state of the dialog changes.',
      table: {
        type: { summary: 'function', detail: '(open: boolean) => void' },
      },
    },
    modal: {
      type: 'boolean',
      description: 'Whether the dialog should be modal or non-modal.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export const Trigger: StoryObj<Dialog.TriggerProps> = {
  argTypes: {
    // @ts-expect-error storybook is pain
    'data-state': {
      description: 'Data attribute indicating the state of the dialog trigger.',
      table: {
        type: { summary: 'open | closed' },
      },
    },
  },
};

export const Content: StoryObj<Dialog.ContentProps> = {
  argTypes: {
    asChild: {
      type: 'boolean',
      description: 'If true, the component will act as a wrapper and pass down its props to its child.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    forceMount: {
      type: 'boolean',
      description: 'If true, forces the content to mount.',
    },
    onOpenAutoFocus: {
      type: 'function',
      description: 'Event handler called when the dialog content auto-focuses upon opening.',
      table: {
        type: { summary: '(event: Event) => void' },
      },
    },
    onCloseAutoFocus: {
      type: 'function',
      description: 'Event handler called when the dialog content auto-focuses upon closing.',
      table: {
        type: { summary: '(event: Event) => void' },
      },
    },
    onEscapeKeyDown: {
      type: 'function',
      description: 'Event handler called when the escape key is pressed.',
      table: {
        type: { summary: '(event: KeyboardEvent) => void' },
      },
    },
    onPointerDownOutside: {
      type: 'function',
      description: 'Event handler called when a pointer down event occurs outside the dialog content.',
      table: {
        type: { summary: '(event: PointerEvent) => void' },
      },
    },
    onInteractOutside: {
      type: 'function',
      description: 'Event handler called when an interaction occurs outside the dialog content.',
      table: {
        type: { summary: '(event: Event) => void' },
      },
    },
    // @ts-expect-error storybook is pain
    'data-state': {
      type: 'string',
      description: 'Data attribute indicating the state of the dialog content.',
      table: {
        type: { summary: '"open" | "closed"' },
      },
    },
    size: {
      description: 'Pre-defined size of the dialog.',
      table: {
        type: { summary: '"1" | "2" | "3" | "fullscreen"' },
        defaultValue: { summary: '"2"' },
      },
    },
    placement: {
      description: 'Pre-defined size of the dialog.',
      table: {
        type: { summary: '"top" | "center"' },
        defaultValue: { summary: '"top"' },
      },
    },
    overlay: {
      type: 'boolean',
      description: "If true, an overlay will be shown behind the dialog. Use in conjunction with 'modal' on Root.",
      table: { defaultValue: { summary: 'false' } },
    },
    portal: {
      type: 'boolean',
      description: 'If true, dialog will be portalled into the body.',
      table: { defaultValue: { summary: 'false' } },
    },
    portalContainer: {
      table: { type: { summary: 'HTMLElement' } },
      description: 'Custom container to portal the content into.',
    },
  },
};
