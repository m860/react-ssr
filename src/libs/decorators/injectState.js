/**
 * 为组件注入state
 * @param {Function} component - 组件
 * @param {?Object} state - state
 * @return {StateProvider}
 */
export default function (component, state) {
    const base = component.WrappedComponent || component;
    const staticPropertyKeys = Object.keys(base);

    class StateWrapper extends base {
        constructor(props) {
            super(props);
            if (this.state) {
                if (state) {
                    //TODO 实现state数据的合并而不是全覆盖
                    this.state = state;
                }
            }
            else {
                if (state) {
                    //以覆盖的方式初始化state
                    this.state = state;
                }
            }
        }
    }

    staticPropertyKeys.forEach(key => {
        StateWrapper[key] = base[key];
    });

    if (component.WrappedComponent) {
        component.WrappedComponent = StateWrapper;
        return component;
    }
    else {
        return StateWrapper;
    }
}