import React from "react";
import { useRouter } from "next/router";

export const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "ref" : "blue",
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};
