import type { ReactiveController, ReactiveControllerHost } from 'lit';

const collapseHeaderAt = 50;

type Host = ReactiveControllerHost & { collapsed: boolean };
export class ScrollController implements ReactiveController {
  private host: Host;

  constructor(host: Host) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  hostDisconnected(): void {
    window.removeEventListener('scroll', this.handleScroll);
    this.host.removeController(this);
  }

  private handleScroll = (): void => {
    this.host.collapsed = window.scrollY >= collapseHeaderAt;
  };
}
