import ResponsiveMaintainAction from "./ResponsiveMaintainAction"

type ResponsiveMaintain = {
    actions: {
        insert: ?ResponsiveMaintainAction,
        update: ?ResponsiveMaintainAction,
        delete: ?ResponsiveMaintainAction,
        select: ?ResponsiveMaintainAction
    },
    permissions: {
        insert: Boolean,
        update: Boolean,
        delete: Boolean,
        select: Boolean,
    },
    //DataTable.propTypes
    dataTableProps: Object
};

export default ResponsiveMaintain;