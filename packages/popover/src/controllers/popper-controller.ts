import { ReactiveControllerHost, ReactiveController } from 'lit';
import tippy, { Content, Instance, Props, PopperElement } from 'tippy.js/headless';

export type PopperHost = ReactiveControllerHost & Element;

export class PopperController implements ReactiveController {
  host: PopperHost;
  content: Content;
  props?: Props;
  instance?: Instance;

  constructor(host: PopperHost, content: Content, props?: Props) {
    (this.host = host).addController(this);
    this.content = content;
    this.props = props;
  }

  hostConnected() {
    this.createInstance();
  }

  hostDisconnected() {
    this.instance?.destroy();
  }

  protected createInstance() {
    if (!this.instance) {
      this.instance = tippy(this.host, {
        ...this.props,
        content: this.content,
        render: (instance) => this.render(instance),
      });
    }
  }

  protected render(instance: Instance): {
    popper: PopperElement<Props>;
    onUpdate(prevProps: Props, nextProps: Props): void;
  } {
    const popper = document.createElement('fwc-popper');
    popper.textContent = instance.props.content.toString();

    function onUpdate(prevProps: Props, nextProps: Props) {
      if (prevProps.content !== nextProps.content) {
        popper.textContent = nextProps.content.toString();
      }
    }

    return { popper, onUpdate };
  }
}

export default PopperController;
