import { ReactiveController } from 'lit';
import tippy, { Instance, Props, PopperElement as TippyElement } from 'tippy.js/headless';
import { PopperHost } from '../types';
import { PopperElement } from '../element';

export class PopperController implements ReactiveController {
  host: PopperHost;
  content: HTMLElement;
  props?: Partial<Props>;
  instance?: Instance;
  popper?: PopperElement;

  constructor(host: PopperHost, content: HTMLElement, props?: Partial<Props>) {
    this.host = host;
    this.content = content;
    this.props = props;
    this.host.addController(this);
  }

  hostConnected(): void {
    this.createInstance();
  }

  hostDisconnected(): void {
    this.instance?.destroy();
  }

  setProps(props: Partial<Props>) {
    this.instance?.setProps(props);
  }

  protected createInstance(): void {
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = tippy(this.host, {
      ...this.props,
      appendTo: this.host,
      render: () => this.render(),
    });
  }

  protected render(): {
    popper: TippyElement<Props>;
  } {
    return { popper: this.content as unknown as HTMLDivElement };
  }
}

export default PopperController;
