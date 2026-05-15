import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  success: styles.btnSuccess,
  danger: styles.btnDanger,
  warning: styles.btnWarning,
  info: styles.btnInfo,
  light: styles.btnLight,
  dark: styles.btnDark,
  link: styles.btnLink,
  "outline-primary": styles.btnOutlinePrimary,
  "outline-secondary": styles.btnOutlineSecondary,
  "outline-success": styles.btnOutlineSuccess,
  "outline-danger": styles.btnOutlineDanger,
  "outline-warning": styles.btnOutlineWarning,
  "outline-info": styles.btnOutlineInfo,
  "outline-light": styles.btnOutlineLight,
  "outline-dark": styles.btnOutlineDark,
};

const sizeClass: Record<ButtonSize, string | undefined> = {
  sm: styles.btnSm,
  md: undefined,
  lg: styles.btnLg,
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch button to fill its container */
  block?: boolean;
  /** Manually toggle active state */
  active?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Label shown next to the spinner when loading */
  loadingLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      block = false,
      active = false,
      loading = false,
      loadingLabel,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.btn,
      variantClass[variant],
      sizeClass[size],
      block ? styles.btnBlock : undefined,
      active ? styles.btnActive : undefined,
      loading || disabled ? styles.btnDisabled : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {loading && loadingLabel ? loadingLabel : children}
      </button>
    );
  },
);

Button.displayName = "Button";
