import { ReactNode } from "react";
import { connectionTypeState } from "@/state/connectionType";
import { ComponentProps } from "@/types";
import { cn } from "@/utils";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";
import { Card } from "./Card";

export type ConnectionTypeSwitchProps = ComponentProps<"div">;

type Option = { label: ReactNode; value: ConnectionTypes };

const connectionTypes = (
  process.env.NEXT_PUBLIC_CONNECTION_TYPE ?? "mysql"
).split(",");

const options = [
  { label: "MySQL", value: "mysql" },
  { label: "Kai", value: "kai" },
].filter((option) => connectionTypes.includes(option.value)) as Option[];

export function ConnectionTypeSwitch({
  className,
  ...props
}: ConnectionTypeSwitchProps) {
  const [connectionType, setConnectionType] = connectionTypeState.useState();

  return (
    <Card
      {...props}
      variant="1"
      size="md"
      className={cn("flex-row px-2", className)}
    >
      {options.map(({ label, value }) => {
        const isActive = connectionType === value;
        return (
          <label
            key={value}
            className={cn("text-sm font-medium", !isActive && "cursor-pointer")}
          >
            <input
              type="radio"
              value={value}
              checked={isActive}
              onChange={() => setConnectionType(value)}
              className="invisible absolute"
            />
            <span
              className={cn(
                "text-s2-gray-600 px-2 py-1",
                !isActive && "hover:text-primary",
                isActive && "bg-primary rounded-md  text-white"
              )}
            >
              {label}
            </span>
          </label>
        );
      })}
    </Card>
  );
}
