import {
  QueuedToast,
  useToastState,
  type ToastState,
} from "@react-stately/toast";
import {
  AriaToastProps,
  type AriaToastRegionProps,
  useToastRegion,
} from "@react-aria/toast";
import { useRef } from "react";

type RenderToast<T> = (
  toast: QueuedToast<T>,
  state: ToastState<T>
) => React.ReactNode;

type Position =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";
/**
 * Provider for toast notifications.
 */
type ToastProviderProps<T> = {
  children: (state: ToastState<T>) => React.ReactNode;
  renderToast: RenderToast<T>;
  position?: Position;
};
export function ToastProvider<T>({
  children,
  position,
  renderToast,
  ...props
}: ToastProviderProps<T>) {
  const state = useToastState<T>({ maxVisibleToasts: 5 });
  return (
    <>
      {/* `onPress` is required in each child */}
      {children(state)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion
          {...props}
          state={state}
          renderToast={renderToast}
          position={position}
        />
      )}
    </>
  );
}

/**
 * Region for toast notifications.
 */
type ToastRegionProps<T> = AriaToastRegionProps & {
  state: ToastState<T>;
  position?: Position;
  renderToast: RenderToast<T>;
};
function ToastRegion<T>({
  state,
  renderToast,
  position = "top-right",
  ...props
}: ToastRegionProps<T>) {
  const TOP = "top-8";
  const BOTTOM = "bottom-8";
  const LEFT = "left-8";
  const RIGHT = "right-8";
  const CENTER = "left-1/2 -translate-x-1/2";
  const positionClasses = {
    "top-left": `${TOP} ${LEFT}`,
    "top-right": `${TOP} ${RIGHT}`,
    "top-center": `${TOP} ${CENTER}`,
    "bottom-left": `${BOTTOM} ${LEFT}`,
    "bottom-right": `${BOTTOM} ${RIGHT}`,
    "bottom-center": `${BOTTOM} ${CENTER}`,
  };
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);
  return (
    <div
      {...regionProps}
      ref={ref}
      className={`toast-region fixed ${positionClasses[position]} flex flex-col gap-4`}
    >
      {state.visibleToasts.map((toast) => renderToast(toast, state))}
    </div>
  );
}

export type ToastProps<T> = AriaToastProps<T> & {
  state: ToastState<T>;
};
type ToastBase<T> = React.ComponentType<ToastProps<T>>;
export function setToast<T>(ToastBase: ToastBase<T>) {
  return function renderToast(toast: QueuedToast<T>, state: ToastState<T>) {
    return <ToastBase key={toast.key} state={state} toast={toast} />;
  };
}
