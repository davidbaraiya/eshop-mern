import React, { forwardRef } from "react";
import { RightArrowIcon } from "../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";

const Button = forwardRef(
  (
    {
      children,
      className = "",
      showIcon = true,
      fontSize,
      as,
      to,
      backButton,
      onClick,
      disabled,
      type,
      ...rest
    },
    ref
  ) => {
    const navigate = useNavigate();

    return as === "Link" ? (
      <Link
        to={to}
        ref={ref}
        className={`btn flex-shrink-0 ${className} ${
          showIcon ? " inline-flex gap-2 items-center " : " "
        }`}
        style={{
          fontSize: fontSize,
          flexDirection: backButton ? "row-reverse" : "",
        }}
        disabled={disabled}
        type={type}
        {...rest}
      >
        <span className="flex-shrink-0">{children}</span>
        {showIcon && (
          <span
            style={{ transform: backButton ? "scale(-1)" : "" }}
            className="flex-shrink-0"
          >
            <RightArrowIcon size={15} />
          </span>
        )}
      </Link>
    ) : (
      <button
        ref={ref}
        onClick={backButton ? () => navigate(-1) : onClick}
        className={`btn flex-shrink-0 ${className} ${
          showIcon ? " inline-flex gap-2 items-center" : ""
        }`}
        style={{
          fontSize: fontSize,
          flexDirection: backButton ? "row-reverse" : "",
        }}
        disabled={disabled}
        type={type}
        {...rest}
      >
        <span className="flex-shrink-0">{children}</span>
        {showIcon && (
          <span
            style={{ transform: backButton ? "scale(-1)" : "" }}
            className="flex-shrink-0"
          >
            <RightArrowIcon size={15} />
          </span>
        )}
      </button>
    );
  }
);

export default Button;
