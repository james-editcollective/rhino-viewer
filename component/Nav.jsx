import React, { useState } from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";

export const Nav = ({ models, currentModel }) => {
  const groups = models.reduce((groups, item) => {
    const group = groups[item.pnu] || [];
    group.push(item);
    groups[item.pnu] = group;
    return groups;
  }, {});

  const pnuList = Object.keys(groups);
  return (
    <div className={style.container}>
      {pnuList.map((pnu) => (
        <div>
          <div className={style.groupTitle} key={pnu}>
            {pnu}
          </div>
          {groups[pnu].map((model) => (
            <div
              className={
                currentModel === model.slug
                  ? style.selectedGroupItem
                  : style.groupItem
              }
              key={model.slug}
            >
              <Link href={`/${model.slug}`}>
                <a>{model.slug}</a>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
