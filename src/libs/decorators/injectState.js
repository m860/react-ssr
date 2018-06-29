/**
 * 为组件注入state
 * @param {Function} component - 组件
 * @param {?Object} state - state
 * @return {StateWrapper}
 */
export default function (component, state) {
    const staticPropertyKeys = Object.keys(component);

    class StateWrapper extends component {
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
        StateWrapper[key] = component[key];
    });

    return StateWrapper;
}