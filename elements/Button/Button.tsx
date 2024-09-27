import React from "react";
import tw, { styled, TwStyle, css } from "twin.macro";
import Link from "../../components/link";

type StyleProps = {
  withArrow?: boolean;
  buttonColor?: keyof typeof ButtonColors;
};

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;
type ButtonRef = React.ForwardedRef<HTMLButtonElement>;

type ComponentProps = {
  href?: string;
  children?: React.ReactNode;
  css?: string | TwStyle | TwStyle[];
  onClick?: (ev: React.MouseEvent) => void;
};

type Props = ComponentProps & StyleProps;

const ButtonColors = {
  red: tw`bg-red-light text-white`,
  green: tw`bg-green-dark text-white`,
  blue: tw`background[rgba(56, 74, 98, 0.1)] box-shadow[px 10px 20px 1px rgba(164, 164, 164, 0.1)] text-blue-md`,
};

const StyledButton = styled.button<StyleProps>(
  ({ buttonColor = "red", withArrow = false }) => {
    return [
      tw`font-sans border-radius[3px] py-3 px-6 text-sm font-semibold letter-spacing[initial]`,
      ButtonColors[buttonColor],
      withArrow &&
        (buttonColor === "red" || buttonColor === "green") &&
        css`
          ${tw`py-2.5 px-3.5`}
          &:hover {
            span {
              &::after {
                background-position: 13px 4px;
              }
            }
          }
          span {
            color: inherit;
            &::after {
              background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 9L5 5L1 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
              content: "";
              background-size: 6px;
              background-position: 10px 4px;
              white-space: nowrap;
              padding-left: 20px;
              background-repeat: no-repeat;
              transition: background-position 0.2s;
            }
          }
        `,
      withArrow &&
        buttonColor === "blue" &&
        css`
          &:hover {
            span {
              &::after {
                background-position: 13px 4px;
              }
            }
          }
          span {
            color: inherit;
            letter-spacing: 0.02em;
            font-size: 14px;
            &::after {
              background-image: url("data:image/svg+xml,%3Csvg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.4051 5.99995C7.4051 6.21995 7.32511 6.41995 7.16511 6.57995L1.96511 11.58C1.80511 11.72 1.6051 11.7999 1.4051 11.7999C1.1851 11.7999 0.985095 11.7199 0.825095 11.5599C0.525095 11.2399 0.52509 10.7399 0.84509 10.4199L5.44509 5.99995L0.84509 1.57995C0.52509 1.27995 0.525095 0.759951 0.825095 0.439951C1.12509 0.119951 1.64511 0.119949 1.96511 0.419949L7.16511 5.41995C7.32511 5.57995 7.4051 5.77995 7.4051 5.99995Z' fill='%23506683'/%3E%3C/svg%3E%0A");
              content: "";
              background-size: 7px;
              background-position: 10px 4px;
              white-space: nowrap;
              padding-left: 20px;
              background-repeat: no-repeat;
              transition: background-position 0.2s;
            }
          }
        `,
    ];
  }
);

const StyledLink = styled(Link)<StyleProps>(
  ({ buttonColor = "red", withArrow = false }) => {
    return [
      tw`font-sans border-radius[3px] py-3 px-6 text-sm font-semibold letter-spacing[initial] inline-block`,
      ButtonColors[buttonColor],
      withArrow &&
        (buttonColor === "red" || buttonColor === "green") &&
        css`
          ${tw`py-2.5 px-3.5`}
          &:hover {
            span {
              &::after {
                background-position: 13px 4px;
              }
            }
          }
          span {
            color: inherit;
            &::after {
              background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 9L5 5L1 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
              content: "";
              background-size: 6px;
              background-position: 10px 4px;
              white-space: nowrap;
              padding-left: 20px;
              background-repeat: no-repeat;
              transition: background-position 0.2s;
            }
          }
        `,
      withArrow &&
        buttonColor === "blue" &&
        css`
          &:hover {
            span {
              &::after {
                background-position: 13px 4px;
              }
            }
          }
          span {
            color: inherit;
            letter-spacing: 0.02em;
            font-size: 14px;
            &::after {
              background-image: url("data:image/svg+xml,%3Csvg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.4051 5.99995C7.4051 6.21995 7.32511 6.41995 7.16511 6.57995L1.96511 11.58C1.80511 11.72 1.6051 11.7999 1.4051 11.7999C1.1851 11.7999 0.985095 11.7199 0.825095 11.5599C0.525095 11.2399 0.52509 10.7399 0.84509 10.4199L5.44509 5.99995L0.84509 1.57995C0.52509 1.27995 0.525095 0.759951 0.825095 0.439951C1.12509 0.119951 1.64511 0.119949 1.96511 0.419949L7.16511 5.41995C7.32511 5.57995 7.4051 5.77995 7.4051 5.99995Z' fill='%23506683'/%3E%3C/svg%3E%0A");
              content: "";
              background-size: 7px;
              background-position: 10px 4px;
              white-space: nowrap;
              padding-left: 20px;
              background-repeat: no-repeat;
              transition: background-position 0.2s;
            }
          }
        `,
    ];
  }
);

export const Button = React.forwardRef<ButtonElement, Props>((props, ref) => {
  const { href, children, onClick, ...rest } = props;
  if (href) {
    return (
      <StyledLink to={href} ref={ref} {...rest}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton ref={ref as ButtonRef} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
});
