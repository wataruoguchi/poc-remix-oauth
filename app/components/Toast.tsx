import { Button } from "@/Button";
import { useToast } from "@react-aria/toast";
import { useRef } from "react";
import { ToastProps } from "./ToastProvider";

export type ToastContent = {
  title?: string;
  description?: string;
};

/**
 * Toast component.
 */
export function Toast<T extends ToastContent>({
  state,
  ...props
}: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } =
    useToast(props, state, ref);
  const { content } = props.toast;
  return (
    <div {...toastProps} ref={ref} className="toast flex items-left">
      <div className="flex flex-col">
        <Button
          {...closeButtonProps}
          className="toast-close-button px-2"
          variant="icon"
        >
          x
        </Button>
      </div>
      <div className="flex flex-col">
        {content.title && (
          <div {...titleProps} className="toast-title font-bold block">
            {content.title}
          </div>
        )}
        {content.description ?? (
          <div
            {...descriptionProps}
            className="toast-description text-lg block"
          >
            {content.description}
          </div>
        )}
      </div>
    </div>
  );
}
