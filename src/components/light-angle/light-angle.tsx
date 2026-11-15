import React, { useId, useRef } from 'react';
import { cx } from 'class-variance-authority';
import { LightSourceIcon } from '@components/icons/light-source';

const MIN_ANGLE = -180;
const FULL_TURN = 360;
const BEAM_PATH =
  'M28.8503 52.1085L0.608784 23.8664L15.8506 8.6246C19.9893 4.48594 22.4241 0.878192 28.7956 0.876273C35.0738 0.874381 37.6099 4.34926 41.706 8.44557L57.1094 23.8494L28.8503 52.1085Z';
const BEAM_EDGE_PATH =
  'M28.7957 1.37568C34.823 1.37386 37.2028 4.64916 41.3524 8.79892L56.4026 23.8491L28.8503 51.4014L1.3159 23.8671L16.2045 8.97846C20.4085 4.77444 22.6793 1.37753 28.7957 1.37568Z';

type LightAngleElement = HTMLDivElement;
type LightAngleProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'defaultValue' | 'aria-hidden'> & {
  value: number;
  onValueChange: (value: number) => void;
  onValueCommit?: ((value: number) => void) | undefined;
};

const LightAngle = React.forwardRef<LightAngleElement, LightAngleProps>((props, forwardedRef) => {
  const { className, value, onValueChange, onValueCommit, onPointerDown, onPointerMove, onPointerUp, ...rootProps } =
    props;
  const sourceRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef(0);

  const getDraggedAngle = (event: React.PointerEvent<HTMLElement>) =>
    normalizeAngle(getPointerAngle(event) + dragOffsetRef.current);

  const changeAngle = (nextAngle: number) => {
    if (nextAngle !== value) {
      onValueChange(nextAngle);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOffsetRef.current = isWithin(sourceRef.current, event.target) ? value - getPointerAngle(event) : 0;
    changeAngle(getDraggedAngle(event));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (!event.defaultPrevented && event.currentTarget.hasPointerCapture(event.pointerId)) {
      changeAngle(getDraggedAngle(event));
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(event);
    if (event.defaultPrevented || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    const committedAngle = getDraggedAngle(event);
    changeAngle(committedAngle);
    onValueCommit?.(committedAngle);
  };

  return (
    <div
      ref={forwardedRef}
      {...rootProps}
      aria-hidden
      className={cx('fp-LightAngleRoot', className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="fp-LightAngleRotor" style={{ transform: `rotate(${value}deg)` }}>
        <LightBeam />
        <div ref={sourceRef} className="fp-LightAngleSource">
          <LightSourceIcon className="fp-LightAngleSourceIcon" />
        </div>
      </div>
      <span className="fp-LightAngleCenter" />
    </div>
  );
});

LightAngle.displayName = 'LightAngle';

const LightBeam = () => {
  const id = useId();
  const coreGlowId = `${id}-core-glow`;
  const outerGlowId = `${id}-outer-glow`;
  const fadeId = `${id}-fade`;
  const edgeId = `${id}-edge`;

  return (
    <svg className="fp-LightAngleBeam" width="56" height="38" viewBox="0.85 0 56 38" fill="none">
      <path d={BEAM_PATH} fill={`url(#${coreGlowId})`} />
      <path d={BEAM_PATH} fill={`url(#${outerGlowId})`} />
      <path d={BEAM_PATH} fill={`url(#${fadeId})`} />
      <path d={BEAM_EDGE_PATH} stroke={`url(#${edgeId})`} strokeOpacity="0.38" />
      <defs>
        <radialGradient
          id={coreGlowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.7926 7.13426) rotate(90.0173) scale(28.3295 31.3649)"
        >
          <stop stopColor="white" stopOpacity="0.96" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={outerGlowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.7926 7.13427) rotate(90.0173) scale(30.9706 34.289)"
        >
          <stop stopColor="white" stopOpacity="0.76" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fadeId} x1="28.7924" y1="7.79289" x2="28.7996" y2="31.6432" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.57" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={edgeId} x1="28.7932" y1="5.24066" x2="28.7955" y2="12.9741" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

function getPointerAngle(event: React.PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);

  return Math.round((Math.atan2(x, -y) * 180) / Math.PI);
}

function normalizeAngle(angle: number) {
  return ((((angle - MIN_ANGLE) % FULL_TURN) + FULL_TURN) % FULL_TURN) + MIN_ANGLE;
}

function isWithin(container: Element | null, target: EventTarget) {
  return target instanceof Node && Boolean(container?.contains(target));
}

export type { LightAngleProps };
export { LightAngle };
