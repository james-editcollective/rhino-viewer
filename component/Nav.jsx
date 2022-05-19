import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";

export const Nav = ({ models }) => {
  return (
    <div className={style.container}>
      {models.map((model) => (
        <li key={model.id}>
          <Link href={`/${model.slug}`}>
            <a>{model.slug}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};
