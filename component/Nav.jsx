import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";
import { ActiveLink } from "./ActiveLink";

export const Nav = ({ models, currentModel }) => {
  const groups = models.reduce((groups, item) => {
    const group = groups[item.pnu] || [];
    group.push(item);
    groups[item.pnu] = group;
    return groups;
  }, {});

  const selectedRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      containerRef.current.scrollTo(0, selectedRef.current.offsetTop - 100);
    }
  }, []);

  const pnuList = Object.keys(groups);
  return (
    <div className={style.container} ref={containerRef}>
      {pnuList.map((pnu) => (
        <div key={pnu}>
          <div className={style.groupTitle}>{pnu}</div>
          {groups[pnu].map((model) => (
            <div
              ref={currentModel === model.slug ? selectedRef : null}
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
