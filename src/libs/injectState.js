export default function (component, state) {
    const staticPropertyKeys = Object.keys(component);

    class StateWrapper extends component {
        constructor(props) {
            super(props);
            if (state) {
                //TODO 实现state数据的合并而不是全覆盖
                this.state = state;
            }
        }
    }

    staticPropertyKeys.forEach(key => {
        StateWrapper[key] = component[key];
    });

    return StateWrapper;
}