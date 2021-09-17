import { PropsWithChildren, createRef, forwardRef, ForwardedRef } from 'react';
import extractProps from './extract-props';
import { RippleElement, RippleElementProps, RippleHandlers } from '@equinor/fusion-wc-ripple';
RippleElement;

export const RippleBox = ({ children, ...props }: PropsWithChildren<RippleElementProps>) => {
  const rippleRef = createRef<RippleElement>();

  const rippleHandlers = new RippleHandlers(async () => {
    return rippleRef.current;
  });

  const handleRippleActivate = (evt: Event) => {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);

      handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    rippleHandlers.startPress(evt);
  };

  const handleRippleDeactivate = () => {
    rippleHandlers.endPress();
  };

  const handleRippleMouseEnter = () => {
    rippleHandlers.startHover();
  };

  const handleRippleMouseLeave = () => {
    rippleHandlers.endHover();
  };

  const handleRippleFocus = () => {
    rippleHandlers.startFocus();
  };

  const handleRippleBlur = () => {
    rippleHandlers.endFocus();
  };

  return (
    <div
      style={{
        width: '5rem',
        height: props.unbounded ? '2.5rem' : '5rem',
        border: '1px solid gray',
        background: '#ddd',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '0.5rem',
      }}
      onMouseEnter={handleRippleMouseEnter}
      onMouseLeave={handleRippleMouseLeave}
      onFocus={handleRippleFocus}
      onBlur={handleRippleBlur}
      onMouseDown={(e) => handleRippleActivate(e.nativeEvent)}
      onTouchStart={(e) => handleRippleActivate(e.nativeEvent)}
      onTouchEnd={handleRippleDeactivate}
      onTouchCancel={handleRippleDeactivate}
    >
      <Ripple ref={rippleRef} {...props} />
      {children}
    </div>
  );
};

export const Ripple = forwardRef(
  ({ children, ...props }: PropsWithChildren<RippleElementProps>, ref: ForwardedRef<RippleElement>): JSX.Element => (
    <fwc-ripple ref={ref} {...extractProps<RippleElementProps>(props)}>
      {children}
    </fwc-ripple>
  )
);

export default Ripple;
