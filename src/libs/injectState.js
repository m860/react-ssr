export default function (component, state) {
    const staticPropertyKeys = Object.keys(component);

    class StateWrapper extends component {
        constructor(props) {
            super(props);
            this.state = state;
        }
    }

    staticPropertyKeys.forEach(key => {
        StateWrapper[key] = component[key];
    });

    return StateWrapper;
}