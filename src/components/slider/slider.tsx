import React, { useEffect, useRef, useState } from 'react';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { cx } from 'class-variance-authority';
import { isDeepEqual } from 'remeda';
import { addClassName } from '@lib/react/add-class-name';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { normalize } from '@lib/number/normalize';

const SNAP_PERCENTAGE_THRESHOLD = 2;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_DIRECTION = 'ltr';

type SliderElement = HTMLDivElement;

type SliderOwnProps = {
  range?: boolean;
  rangeAnchor?: number;
  baseValue?: number;
  hints?: number[];
};
type SliderProps = Omit<
  BaseSlider.Root.Props<number | readonly number[]>,
  | 'children'
  | 'defaultValue'
  | 'dir'
  | 'minStepsBetweenValues'
  | 'onValueChange'
  | 'onValueCommitted'
  | 'thumbAlignment'
  | 'value'
> &
  SliderOwnProps & {
    defaultValue?: number[] | undefined;
    dir?: 'ltr' | 'rtl' | undefined;
    inverted?: boolean | undefined;
    minStepsBetweenThumbs?: number | undefined;
    onValueChange?: ((value: number[]) => void) | undefined;
    onValueCommit?: ((value: number[]) => void) | undefined;
    value?: number[] | undefined;
  };

const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const {
    className,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    defaultValue = [min],
    value,
    onValueChange,
    onValueCommit,
    tabIndex,
    orientation = DEFAULT_ORIENTATION,
    dir = DEFAULT_DIRECTION,
    inverted,
    disabled,
    step = 1,
    minStepsBetweenThumbs,
    range = true,
    rangeAnchor,
    baseValue,
    hints,
    ...rootProps
  } = props;
  const controlRef = useRef<SliderElement>(null);
  const ref = useComposedRefs(controlRef, forwardedRef);
  const focusVisible = true;
  const [trackedValue, setTrackedValue] = useState(value ?? defaultValue);
  const rootValue = getRootValue(trackedValue, inverted, min, max);
  const rootDefaultValue = getRootValue(defaultValue, inverted, min, max);
  const prevValueRef = useRef(value);
  const prevDefaultValueRef = useRef(defaultValue);

  useEffect(() => {
    if (isDeepEqual(value, prevValueRef.current) && isDeepEqual(defaultValue, prevDefaultValueRef.current)) {
      return;
    }

    setTrackedValue(value ?? defaultValue);

    prevValueRef.current = value;
    prevDefaultValueRef.current = defaultValue;
  }, [value, defaultValue]);

  const handleValueChange = (value: number | readonly number[], details: BaseSlider.Root.ChangeEventDetails) => {
    const nextValue = getPointerAdjustedValue(
      getPublicValue(value, inverted, min, max),
      details,
      controlRef.current,
      orientation,
      dir,
      inverted,
      min,
      max,
      step
    );
    const snappedValue = nextValue.map((value) => getSnappedValue(value, hints, min, max));

    onValueChange?.(snappedValue);
    setTrackedValue(snappedValue);
  };

  const handleValueCommit = (value: number | readonly number[], details: BaseSlider.Root.CommitEventDetails) => {
    const nextValue = getPointerAdjustedValue(
      getPublicValue(value, inverted, min, max),
      details,
      controlRef.current,
      orientation,
      dir,
      inverted,
      min,
      max,
      step
    );
    const snappedValue = nextValue.map((value) => getSnappedValue(value, hints, min, max));

    onValueCommit?.(snappedValue);
  };

  return (
    <DirectionProvider direction={dir}>
      <BaseSlider.Root
        className={addClassName(className, 'fp-SliderRoot')}
        defaultValue={rootDefaultValue}
        dir={dir === DEFAULT_DIRECTION ? undefined : dir}
        disabled={disabled}
        max={max}
        min={min}
        minStepsBetweenValues={minStepsBetweenThumbs}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommit}
        orientation={orientation}
        step={step}
        thumbAlignment="center"
        value={rootValue}
        {...rootProps}
      >
        <BaseSlider.Control ref={ref} className="fp-SliderControl" tabIndex={tabIndex ?? -1}>
          <BaseSlider.Track className="fp-SliderTrack" style={{ position: 'static' }}>
            {trackedValue.map((v, i) => (
              <BaseSlider.Thumb
                key={i}
                index={i}
                className={cx('fp-SliderThumb', {
                  'fp-SliderThumb-focusVisible': focusVisible,
                  'fp-SliderThumb-baseValue': v === baseValue,
                })}
              />
            ))}
          </BaseSlider.Track>

          {range && (
            <Range
              dir={dir}
              value={trackedValue}
              min={min}
              max={max}
              orientation={orientation}
              inverted={inverted}
              rangeAnchor={rangeAnchor}
              disabled={disabled}
            />
          )}

          {hints &&
            hints.map((hint) => (
              <Hint
                key={hint}
                hint={hint}
                baseValue={baseValue}
                min={min}
                max={max}
                orientation={orientation}
                dir={dir}
                inverted={inverted}
              />
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
  dir: 'ltr' | 'rtl';
  inverted?: boolean;
};

const Hint = (props: HintProps) => {
  const { baseValue, dir, inverted, max, min, orientation, hint } = props;
  const { startEdge } = getOrientationEdges(orientation, dir, inverted);
  const offset = normalize([min, max], [0, 100])(hint);
  const hintWidth = 4;

  return (
    <span
      className={cx('fp-SliderHint', { 'fp-SliderHint-baseValue': hint === baseValue })}
      data-orientation={orientation}
      style={{ [startEdge]: `calc(${offset}% - ${hintWidth / 2}px)` }}
    />
  );
};

type RangeProps = {
  min: number;
  max: number;
  value: number[];
  orientation: 'horizontal' | 'vertical';
  dir: 'ltr' | 'rtl';
  inverted?: boolean;
  rangeAnchor?: number;
  disabled?: boolean;
};

const Range = (props: RangeProps) => {
  const { min, max, value, rangeAnchor = min, orientation, dir, inverted, disabled } = props;
  const rangeStart = value.length > 1 ? Math.min(...value) : Math.min(rangeAnchor, ...value);
  const rangeEnd = value.length > 1 ? Math.max(...value) : Math.max(rangeAnchor, ...value);
  const offsetStart = normalize([min, max], [0, 100])(rangeStart);
  const offsetEnd = 100 - normalize([min, max], [0, 100])(rangeEnd);
  const edges = getOrientationEdges(orientation, dir, inverted);

  return (
    <span
      className="fp-SliderRange"
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      style={{
        [edges.startEdge]: `${offsetStart}%`,
        [edges.endEdge]: `${offsetEnd}%`,
      }}
    />
  );
};

function getOrientationEdges(
  orientation: 'horizontal' | 'vertical',
  dir: 'ltr' | 'rtl',
  inverted: boolean | undefined
) {
  const inversion = inverted ? 'inverted' : 'normal';
  const edges = {
    vertical: {
      normal: {
        startEdge: 'bottom',
        endEdge: 'top',
      },
      inverted: {
        startEdge: 'top',
        endEdge: 'bottom',
      },
    },
    horizontal: {
      normal: {
        startEdge: dir === 'ltr' ? 'left' : 'right',
        endEdge: dir === 'ltr' ? 'right' : 'left',
      },
      inverted: {
        startEdge: dir === 'ltr' ? 'right' : 'left',
        endEdge: dir === 'ltr' ? 'left' : 'right',
      },
    },
  };

  return edges[orientation][inversion];
}

function getRootValue(value: readonly number[], inverted: boolean | undefined, min: number, max: number) {
  const mappedValue = getMappedValue(value, inverted, min, max);

  if (mappedValue.length === 1) {
    const firstValue = mappedValue[0];

    if (firstValue !== undefined) {
      return firstValue;
    }
  }

  return mappedValue;
}

function getPublicValue(value: number | readonly number[], inverted: boolean | undefined, min: number, max: number) {
  const values = typeof value === 'number' ? [value] : value;

  return getMappedValue(values, inverted, min, max);
}

function getPointerAdjustedValue(
  value: number[],
  details: BaseSlider.Root.ChangeEventDetails | BaseSlider.Root.CommitEventDetails,
  control: SliderElement | null,
  orientation: 'horizontal' | 'vertical',
  dir: 'ltr' | 'rtl',
  inverted: boolean | undefined,
  min: number,
  max: number,
  step: number
) {
  if (details.reason !== 'track-press' || control === null) {
    return value;
  }

  const root = control.parentElement;
  const point = getEventPoint(details.event);

  if (root === null || point === undefined) {
    return value;
  }

  const rect = root.getBoundingClientRect();
  const percent = getPointerPercent(point, rect, orientation, dir, inverted);
  const nextValue = getSteppedValue(min + (max - min) * percent, min, max, step);
  const activeThumbIndex = getActiveThumbIndex(details);

  return value.map((item, index) => {
    if (index === activeThumbIndex || value.length === 1) {
      return nextValue;
    }

    return item;
  });
}

type EventPoint = {
  x: number;
  y: number;
};

function getEventPoint(event: Event): EventPoint | undefined {
  if ('clientX' in event && 'clientY' in event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
    return { x: event.clientX, y: event.clientY };
  }

  return undefined;
}

function getActiveThumbIndex(details: BaseSlider.Root.ChangeEventDetails | BaseSlider.Root.CommitEventDetails) {
  if ('activeThumbIndex' in details && typeof details.activeThumbIndex === 'number') {
    return details.activeThumbIndex;
  }

  return undefined;
}

function getPointerPercent(
  point: EventPoint,
  rect: DOMRect,
  orientation: 'horizontal' | 'vertical',
  dir: 'ltr' | 'rtl',
  inverted: boolean | undefined
) {
  const rawPercent =
    orientation === 'vertical' ? (rect.bottom - point.y) / rect.height : (point.x - rect.left) / rect.width;
  const directionPercent = orientation === 'horizontal' && dir === 'rtl' ? 1 - rawPercent : rawPercent;
  const percent = inverted ? 1 - directionPercent : directionPercent;

  return Math.min(1, Math.max(0, percent));
}

function getSteppedValue(value: number, min: number, max: number, step: number) {
  const steppedValue = min + Math.round((value - min) / step) * step;
  const normalizedValue = Number(steppedValue.toFixed(10));

  return Math.min(max, Math.max(min, normalizedValue));
}

function getMappedValue(value: readonly number[], inverted: boolean | undefined, min: number, max: number) {
  if (!inverted) {
    return [...value];
  }

  return value.map((value) => min + max - value);
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
