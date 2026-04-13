export type BlockPosition = {
  x: number;
  y: number;
};

export const BlockTypes = {
  Webhook: "webhook",
  Start: "start",
  End: "end",
};

export type BlockType = (typeof BlockTypes)[keyof typeof BlockTypes];
