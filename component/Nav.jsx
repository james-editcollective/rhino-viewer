import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";

export const Nav = ({ models }) => {
  const groups = models.reduce((groups, item) => {
    const group = groups[item.pnu] || [];
    group.push(item);
    groups[item.pnu] = group;
    return groups;
  }, {});

  const pnuList = Object.keys(groups);
  pnuList.map((pnu) => {
    console.log(pnu);
    console.log(groups[pnu]);
  });

  return (
    <div className={style.container}>
      {pnuList.map((pnu) => (
        <div>
          <div className={style.groupTitle}>{pnu}</div>
          {groups[pnu].map((model) => (
            <div className={style.groupItem}>
              <Link href={`/${model.slug}`}>
                <a>{model.slug}</a>
              </Link>
            </div>
          ))}
        </div>
      ))}
      {/* {models.map((model) => (
        <li key={model.id}>
          <Link href={`/${model.slug}`}>
            <a>{model.slug}</a>
          </Link>
        </li>
      ))} */}
    </div>
  );
};
