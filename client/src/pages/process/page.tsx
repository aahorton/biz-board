import { BlocksFlow } from "../../modules/blocks-flow";
import {
  CreateBlockModal,
  UpdateBlockModal,
  useStartCreate,
  useStartUpdate,
} from "../../modules/manage-block";
import { useProcess } from "./model/use-process";
import { useProcessId } from "./model/use-process-id";
import { Root } from "./ui/root";

export function Page() {
  const processId = useProcessId();
  const process = useProcess(processId);
  const startCreate = useStartCreate();
  const startUpdate = useStartUpdate();

  return (
    <Root
      process={process.data}
      isLoading={process.isLoading}
      flow={
        process.data && (
          <BlocksFlow
            blocks={process.data.blocks}
            onFlowClick={startCreate}
            onChanged={process.refetch}
            onBlockClick={startUpdate}
          />
        )
      }
      modals={
        <>
          <CreateBlockModal processId={processId} onSuccess={process.refetch} />
          <UpdateBlockModal processId={processId} onSuccess={process.refetch} />
        </>
      }
    />
  );
}
