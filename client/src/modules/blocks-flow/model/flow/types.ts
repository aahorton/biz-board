import { Edge, Node } from "@xyflow/react";
import { Block } from "../../domain/block";

export type AppNode = Node<{ block: Block; blocks: Block[] }, "block">;
export type AppEdge = Edge;
