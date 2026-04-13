import { BlocksFlow } from "../../modules/blocks-flow";
import { CreateBlockModal, useStartCreate } from "../../modules/manage-block";
import { useProcess } from "./model/use-process";
import { useProcessId } from "./model/use-process-id";
import { Root } from "./ui/root";

export function Page() {
  const processId = useProcessId();
  const process = useProcess(processId);
  const startCreate = useStartCreate();

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
          />
        )
      }
      modals={
        <CreateBlockModal processId={processId} onSuccess={process.refetch} />
      }
    />
  );
}
