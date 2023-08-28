import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonVariant = 'filled' | 'outline';

type ButtonTheme = 'primary' | 'secondary';

const SIZE_NAMES: Record<ButtonSize, string> = {
  large: styles.buttonLarge,
  medium: styles.buttonMedium,
  small: styles.buttonSmall,
};

const RECT_SIZE_NAMES: Record<ButtonSize, string> = {
  large: styles.buttonLargeRect,
  medium: styles.buttonMediumRect,
  small: styles.buttonSmallRect,
};

const VARIANT_NAMES: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  filled: {
    primary: styles.buttonFilledPrimary,
    secondary: styles.buttonFilledSecondary,
  },
  outline: {
    primary: styles.buttonOutlinePrimary,
    secondary: styles.buttonOutlineSecondary,
  },
};

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rect?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, size = 'medium', variant = 'filled', theme = 'secondary', rect = false, children, ...rest },
  ref,
) {
  const classes = [
    styles.button,
    (rect ? RECT_SIZE_NAMES : SIZE_NAMES)[size],
    VARIANT_NAMES[variant][theme],
    className,
  ];

  return (
    <button className={classNames(classes)} ref={ref} {...rest}>
      {children}
    </button>
  );
});
