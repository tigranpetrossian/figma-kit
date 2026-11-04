import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import type { IconButtonProps } from '@components/icon-button';
import { IconButton } from '@components/icon-button';
import { EyedropperIcon } from '@components/icons';
import type { ColorSpace } from '@components/color-picker/color-picker';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import type { RGB } from '@lib/color';
import { BYTE_DISPLAY, srgbToDisplayP3 } from '@lib/color';

const DEFAULT_LABEL = 'Pick color';
const SRGB_HEX_PATTERN = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

type BrowserEyeDropperConstructor = new () => {
  open: (options: { signal?: AbortSignal }) => Promise<unknown>;
};

type EyedropperElement = React.ElementRef<'button'>;
type EyedropperProps = Omit<IconButtonProps, 'aria-label'> & {
  /** @default 'Pick color' */
  'aria-label'?: string;
};

const Eyedropper = React.forwardRef<EyedropperElement, EyedropperProps>((props, ref) => {
  const { 'aria-label': ariaLabel = DEFAULT_LABEL, children = <EyedropperIcon />, onClick, ...iconButtonProps } = props;
  const { colorSpace, colorsByModel, onColorChange } = useColorPickerContext('ColorPicker.Eyedropper');
  const unmountSignal = useUnmountSignal();
  const BrowserEyeDropper = useSyncExternalStore(
    subscribeToEyeDropperSupport,
    getBrowserEyeDropper,
    getServerEyeDropper
  );

  if (BrowserEyeDropper === null) {
    return null;
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    const sampled = await sampleScreenColor(BrowserEyeDropper, unmountSignal.current);
    if (sampled !== null) {
      onColorChange({ mode: 'rgb', value: { ...toColorSpace(sampled, colorSpace), a: colorsByModel.rgb.a } });
    }
  };

  return (
    <IconButton ref={ref} aria-label={ariaLabel} {...iconButtonProps} onClick={handleClick}>
      {children}
    </IconButton>
  );
});

Eyedropper.displayName = 'ColorPicker.Eyedropper';

function useUnmountSignal() {
  const signal = useRef<AbortSignal | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    signal.current = controller.signal;
    return () => controller.abort();
  }, []);

  return signal;
}

function subscribeToEyeDropperSupport() {
  return () => {};
}

function getServerEyeDropper() {
  return null;
}

function getBrowserEyeDropper(): BrowserEyeDropperConstructor | null {
  if (!('EyeDropper' in window)) {
    return null;
  }
  const candidate = window.EyeDropper;
  return isBrowserEyeDropperConstructor(candidate) ? candidate : null;
}

function isBrowserEyeDropperConstructor(value: unknown): value is BrowserEyeDropperConstructor {
  return typeof value === 'function';
}

async function sampleScreenColor(
  BrowserEyeDropper: BrowserEyeDropperConstructor,
  signal: AbortSignal | undefined
): Promise<RGB | null> {
  try {
    return parseSampledColor(await new BrowserEyeDropper().open({ signal }));
  } catch {
    return null;
  }
}

function parseSampledColor(result: unknown): RGB | null {
  if (typeof result !== 'object' || result === null || !('sRGBHex' in result) || typeof result.sRGBHex !== 'string') {
    return null;
  }
  const match = SRGB_HEX_PATTERN.exec(result.sRGBHex);
  if (match === null) {
    return null;
  }
  return { r: hexToChannel(match[1]), g: hexToChannel(match[2]), b: hexToChannel(match[3]) };
}

function hexToChannel(hex: string) {
  return BYTE_DISPLAY.fromDisplay(parseInt(hex, 16));
}

function toColorSpace(color: RGB, colorSpace: ColorSpace): RGB {
  return colorSpace === 'display-p3' ? srgbToDisplayP3(color) : color;
}

export type { EyedropperProps };
export { Eyedropper };
