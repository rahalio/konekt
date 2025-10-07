import type { ChainId } from "../../types";
import { CHAINS } from "../../constants";

interface ChainDotProps {
  id: ChainId;
}

export function ChainDot({ id }: ChainDotProps) {
  return (
    <span
      className="mr-1 inline-block h-2.5 w-2.5 rounded-full"
      style={{ background: CHAINS[id].color }}
    />
  );
}
