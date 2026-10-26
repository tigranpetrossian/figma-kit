import React from 'react';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { useValueFieldContext } from '@components/value-field/value-field-elements';
import { addClassName } from '@lib/react/add-class-name';
import { useControllableState } from '@lib/react/use-controllable-state';
import { normalize } from '@lib/number/normalize';

const SNAP_PERCENTAGE_THRESHOLD = 2;
const SNAPPING_REASONS: ReadonlySet<BaseSlider.Root.ChangeEventReason> = new Set(['drag', 'track-press']);
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_DIRECTION = 'ltr';
const ORIENTATION_EDGES = {
  horizontal: { startEdge: 'insetInlineStart', endEdge: 'insetInlineEnd' },
  vertical: { startEdge: 'bottom', endEdge: 'top' },
} as const;

const slider = cva('fp-SliderRoot', {
  variants: {
    size: {
      small: 'fp-size-small',
      large: 'fp-size-large',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

type SliderElement = HTMLDivElement;

type SliderOwnProps = {
  range?: boolean;
  rangeAnchor?: number;
  baseValue?: number;
  hints?: number[];
};
type SliderOrientationProps =
  | {
      orientation?: 'horizontal' | undefined;
      inverted?: boolean | undefined;
    }
  | {
      orientation: 'vertical';
      inverted?: false | undefined;
    };
type SliderProps = Omit<
  BaseSlider.Root.Props<number | readonly number[]>,
  | 'children'
  | 'defaultValue'
  | 'dir'
  | 'minStepsBetweenValues'
  | 'onValueChange'
  | 'onValueCommitted'
  | 'orientation'
  | 'thumbAlignment'
  | 'value'
> &
  SliderOwnProps &
  SliderOrientationProps &
  VariantProps<typeof slider> & {
    defaultValue?: number[] | undefined;
    dir?: 'ltr' | 'rtl' | undefined;
    getAriaLabel?: ((index: number) => string) | undefined;
    minStepsBetweenThumbs?: number | undefined;
    onValueChange?: ((value: number[]) => void) | undefined;
    onValueCommit?: ((value: number[]) => void) | undefined;
    value?: number[] | undefined;
  };

const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const {
    className,
    size,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    defaultValue = [min],
    value: valueProp,
    onValueChange,
    onValueCommit,
    tabIndex,
    orientation = DEFAULT_ORIENTATION,
    dir = DEFAULT_DIRECTION,
    inverted,
    disabled: disabledProp,
    step = 1,
    minStepsBetweenThumbs,
    range = true,
    rangeAnchor,
    baseValue,
    hints,
    'aria-label': ariaLabel,
    getAriaLabel,
    ...rootProps
  } = props;
  const valueFieldContext = useValueFieldContext('Slider');
  const disabled = disabledProp || valueFieldContext?.disabled;
  const focusVisible = true;
  const [value = defaultValue, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const direction = getTrackDirection(orientation, dir, inverted);

  const handleValueChange = (nextValue: number | readonly number[], details: BaseSlider.Root.ChangeEventDetails) => {
    setValue(getSnappedValues(toValueArray(nextValue), details.reason, hints, min, max));
  };

  const handleValueCommit = (nextValue: number | readonly number[], details: BaseSlider.Root.CommitEventDetails) => {
    onValueCommit?.(getSnappedValues(toValueArray(nextValue), details.reason, hints, min, max));
  };

  return (
    <DirectionProvider direction={direction}>
      <BaseSlider.Root
        className={addClassName(className, slider({ size }))}
        dir={direction}
        disabled={disabled}
        max={max}
        min={min}
        minStepsBetweenValues={minStepsBetweenThumbs}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommit}
        orientation={orientation}
        step={step}
        thumbAlignment="center"
        value={toRootValue(value)}
        {...rootProps}
      >
        <BaseSlider.Control ref={forwardedRef} className="fp-SliderControl" tabIndex={tabIndex ?? -1}>
          <BaseSlider.Track className="fp-SliderTrack" style={{ position: 'static' }}>
            {value.map((v, i) => (
              <BaseSlider.Thumb
                key={i}
                index={i}
                aria-label={ariaLabel}
                getAriaLabel={getAriaLabel}
                className={cx('fp-SliderThumb', {
                  'fp-SliderThumb-focusVisible': focusVisible,
                  'fp-SliderThumb-baseValue': v === baseValue,
                })}
              />
            ))}
          </BaseSlider.Track>

          {range && (
            <Range
              value={value}
              min={min}
              max={max}
              orientation={orientation}
              rangeAnchor={rangeAnchor}
              disabled={disabled}
            />
          )}

          {hints &&
            hints.map((hint) => (
              <Hint key={hint} hint={hint} baseValue={baseValue} min={min} max={max} orientation={orientation} />
            ))}
        </BaseSlider.Control>
      </BaseSlider.Root>
    </DirectionProvider>
  );
});

Slider.displayName = 'Slider';

type HintProps = {
  hint: number;
  baseValue?: number;
  min: number;
  max: number;
  orientation: 'horizontal' | 'vertical';
};

const Hint = (props: HintProps) => {
  const { baseValue, max, min, orientation, hint } = props;
  const { startEdge } = ORIENTATION_EDGES[orientation];
  const offset = normalize([min, max], [0, 100])(hint);

  return (
    <span
      className={cx('fp-SliderHint', { 'fp-SliderHint-baseValue': hint === baseValue })}
      data-orientation={orientation}
      style={{ [startEdge]: `calc(${offset}% - var(--slider-hint-width) / 2)` }}
    />
  );
};

type RangeProps = {
  min: number;
  max: number;
  value: number[];
  orientation: 'horizontal' | 'vertical';
  rangeAnchor?: number;
  disabled?: boolean;
};

const Range = (props: RangeProps) => {
  const { min, max, value, rangeAnchor = min, orientation, disabled } = props;
  const rangeStart = value.length > 1 ? Math.min(...value) : Math.min(rangeAnchor, ...value);
  const rangeEnd = value.length > 1 ? Math.max(...value) : Math.max(rangeAnchor, ...value);
  const offsetStart = normalize([min, max], [0, 100])(rangeStart);
  const offsetEnd = 100 - normalize([min, max], [0, 100])(rangeEnd);
  const { startEdge, endEdge } = ORIENTATION_EDGES[orientation];

  return (
    <span
      className="fp-SliderRange"
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      style={{
        [startEdge]: `${offsetStart}%`,
        [endEdge]: `${offsetEnd}%`,
      }}
    />
  );
};

function getTrackDirection(orientation: 'horizontal' | 'vertical', dir: 'ltr' | 'rtl', inverted: boolean | undefined) {
  if (orientation === 'vertical' || !inverted) {
    return dir;
  }

  return dir === 'ltr' ? 'rtl' : 'ltr';
}

function toRootValue(value: number[]) {
  const [firstValue] = value;

  return value.length === 1 && firstValue !== undefined ? firstValue : value;
}

function toValueArray(value: number | readonly number[]) {
  return typeof value === 'number' ? [value] : [...value];
}

function getSnappedValues(
  value: number[],
  reason: BaseSlider.Root.ChangeEventReason,
  hints: number[] | undefined,
  min: number,
  max: number
) {
  if (!SNAPPING_REASONS.has(reason)) {
    return value;
  }

  return value.map((item) => getSnappedValue(item, hints, min, max));
}

function getSnappedValue(value: number, hints: number[] | undefined, min: number, max: number) {
  const snappingFactor = normalize([0, 100], [0, max - min])(SNAP_PERCENTAGE_THRESHOLD);
  const closestHint = hints?.find((hint) => Math.abs(hint - value) <= snappingFactor);
  if (typeof closestHint === 'number') {
    return closestHint;
  }

  return value;
}

export type { SliderProps };
export { Slider };
