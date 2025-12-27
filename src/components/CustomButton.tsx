import { Link } from "react-router-dom";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

type CustomButtonVariant = "gold" | "light" | "dark";

const VARIANT_MODIFIER: Record<CustomButtonVariant, string> = {
  gold: "",
  light: "btn-modern--light",
  dark: "btn-modern--dark",
};

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: CustomButtonVariant;
};

type LinkLikeProps = {
  to: string;
  href?: never;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "to" | "className" | "children">;

type AnchorLikeProps = {
  href: string;
  to?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonLikeProps = {
  to?: never;
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type CustomButtonProps = BaseProps & (LinkLikeProps | AnchorLikeProps | ButtonLikeProps);

const isLinkProps = (
  props: CustomButtonProps,
): props is BaseProps & LinkLikeProps => "to" in props && typeof props.to === "string";

const isAnchorProps = (
  props: CustomButtonProps,
): props is BaseProps & AnchorLikeProps => "href" in props && typeof props.href === "string";

const composeClassName = (variant: CustomButtonVariant, extraClassName?: string) => {
  const modifier = VARIANT_MODIFIER[variant];
  return ["btn-modern", modifier, extraClassName].filter(Boolean).join(" ");
};

export const CustomButton = (props: CustomButtonProps) => {
  const { variant = "gold", className, children } = props;
  const classNames = composeClassName(variant, className);

  if (isLinkProps(props)) {
    const { to, variant: _variant, className: _className, children: _children, ...linkProps } = props;
    return (
      <Link to={to} className={classNames} {...linkProps}>
        {_children}
      </Link>
    );
  }

  if (isAnchorProps(props)) {
    const {
      href,
      variant: _variant,
      className: _className,
      children: _children,
      ...anchorProps
    } = props;
    return (
      <a href={href} className={classNames} {...anchorProps}>
        {_children}
      </a>
    );
  }

  const {
    variant: _variant,
    className: _className,
    children: _children,
    ...buttonProps
  } = props as BaseProps & ButtonLikeProps;

  return (
    <button className={classNames} {...buttonProps}>
      {_children}
    </button>
  );
};
