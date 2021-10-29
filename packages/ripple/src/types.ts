export type RippleElementProps = {
  primary?: boolean;
  accent?: boolean;
  unbounded?: boolean;
  activated?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startPress?: (e?: Event) => void;
  endPress?: () => void;
  startFocus?: () => void;
  endFocus?: () => void;
  startHover?: () => void;
  endHover?: () => void;
};
