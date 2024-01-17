import React from 'react';
import { SerializedNodes } from '../interfaces';
export type FrameProps = {
    json?: string;
    data?: string | SerializedNodes;
};
/**
 * A React Component that defines the editable area
 */
export declare const Frame: React.FC<React.PropsWithChildren<FrameProps>>;
