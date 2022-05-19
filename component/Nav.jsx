import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";

export const Nav = ({ models }) => {
  return (
    <div className={style.container}>
      {models.map((model, index) => (
        <li>
          <Link href={`/${model.slug}`} key={index}>
            <a>{model.slug}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};
