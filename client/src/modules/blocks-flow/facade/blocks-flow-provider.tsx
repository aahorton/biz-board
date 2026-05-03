import { ReactFlowProvider } from "@xyflow/react";
import { BlocksFlow } from "./blocks-flow";

export const BlocksFlowProvider: typeof BlocksFlow = (props) => {
  return (
    <ReactFlowProvider>
      <BlocksFlow {...props} />
    </ReactFlowProvider>
  );
};
