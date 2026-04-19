import React from "react";
import { Port } from "../../domain/port";

export type ControllerType = {
  rootProps: React.HTMLAttributes<HTMLDivElement>;
  fieldProps: React.HTMLAttributes<HTMLDivElement>;
  portTarget?: (port: Port) => {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };
  arrow?: (relationId: string) => {
    onClick?: React.MouseEventHandler<SVGPathElement>;
  };
};
