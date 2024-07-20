import * as React from "react";
import { useSpinDelay } from "spin-delay";
import { ButtonForwardable, type ButtonProps } from "@/Button";
import { Hourglass, BadgeCheck, BadgeX } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/Tooltip";

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    status: "pending" | "success" | "error" | "idle";
    message?: string | null;
    spinDelay?: Parameters<typeof useSpinDelay>[1];
  } & {
    children: React.ReactNode;
  }
>(({ message, status, className, children, spinDelay, ...props }, ref) => {
  const companion = getCompanion(
    useSpinDelay(status === "pending", {
      delay: 400,
      minDuration: 300,
      ...spinDelay,
    }),
    status
  );
  // TODO: IDK how the tooltip works
  return (
    <ButtonForwardable ref={ref} className={className} {...props}>
      <div>{children}</div>
      {message ? (
        <TooltipTrigger>
          {companion}
          <Tooltip>{message}</Tooltip>
        </TooltipTrigger>
      ) : (
        companion
      )}
    </ButtonForwardable>
  );
});
StatusButton.displayName = "Button";

function getCompanion(
  delayedPending: boolean,
  status: "pending" | "success" | "error" | "idle"
) {
  return {
    pending: delayedPending ? (
      <div
        role="status"
        className="inline-flex h-6 w-6 items-center justify-center"
      >
        <Hourglass className="loading" />
      </div>
    ) : null,
    success: (
      <div
        role="status"
        className="inline-flex h-6 w-6 items-center justify-center"
      >
        <BadgeCheck className="success" />
      </div>
    ),
    error: (
      <div
        role="status"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive"
      >
        <BadgeX className="error text-destructive-foreground" />
      </div>
    ),
    idle: null,
  }[status];
}
