import React from 'react';
import { NodeId } from '../interfaces';
export type NodeContextType = {
    id: NodeId;
    related?: boolean;
};
export declare const NodeContext: React.Context<NodeContextType>;
export type NodeProviderProps = Omit<NodeContextType, 'connectors'>;
export declare const NodeProvider: React.FC<React.PropsWithChildren<NodeProviderProps>>;
