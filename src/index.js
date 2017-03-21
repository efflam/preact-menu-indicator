import { h, Component } from "preact";

export class MenuIndicator extends Component {
  items = [];
  state = {};

  getChildContext() {
    return {
      add: this.add,
      remove: this.remove
    };
  }

  add = (id, el) => {
    if (!this.state.activeTarget) this.setState({ activeTarget: el });
    this.items[id] = el;
  };

  remove = id => {
    if (!this.items[id]) return;
    delete this.items[id];
  };

  componentWillReceiveProps({ id }) {
    if (id !== this.props.id) {
      this.setState({ activeTarget: this.items[id] });
    }
  }

  render(
    { children, color = "blue", height = 3, renderIndicator },
    { activeTarget }
  ) {
    return (
      <div style={{ position: "relative" }}>
        {children}
        {activeTarget && renderIndicator(activeTarget)}
      </div>
    );
  }
}

export class MenuIndicatorTarget extends Component {
  componentWillMount() {
    this.context.remove(this.props.id);
  }

  render({ children, id }, state, { add }) {
    return (
      <div ref={el => add(id, el)}>
        {children}
      </div>
    );
  }
}
