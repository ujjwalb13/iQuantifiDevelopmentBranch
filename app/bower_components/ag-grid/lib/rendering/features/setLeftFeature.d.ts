// Type definitions for ag-grid v5.0.0-alpha.5
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { ColumnGroupChild } from "../../entities/columnGroupChild";
export declare class SetLeftFeature {
    private columnOrGroup;
    private eCell;
    private destroyFunctions;
    constructor(columnOrGroup: ColumnGroupChild, eCell: HTMLElement);
    private init();
    private onLeftChanged();
    destroy(): void;
}
