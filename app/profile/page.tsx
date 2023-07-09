"use client";

import { useSession } from "next-auth/react";
import setUser from "../hooks/setUser";
import RateCard from "@/components/RateCard";
import menuIcon from "@/photos/menuIcon.png";
import Image from "next/image";
import Link from "next/link";
import next from "@/photos/next.png";
import previous from "@/photos/previous.png";
import radiobutton from "@/photos/radiobutton.png";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { user } = setUser();

  const [x, setX] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [pageItems, setPageItems] = useState<number>(1);

  const [length, setLength] = useState(1);

  const lastPostIndex = page * pageItems;
  const firstPostIndex = lastPostIndex - pageItems;
  const currentItem = user?.works.slice(firstPostIndex, lastPostIndex);

  const dolzina = user?.works.length;

  return (
    <div className="profile">
      {session && (
        <div className="userLoggedProfile">
          <h2>{session?.user?.email}</h2>

          <Link href="/">
            <Image
              src={menuIcon}
              width={35}
              height={35}
              alt="menuIcon"
              className="userLoggedImage"
            />
          </Link>
        </div>
      )}

      <div className="inner">
        {currentItem &&
          currentItem.map((item: any, i: number) => (
            <RateCard item={item} key={i} x={x} />
          ))}
      </div>

      <div className="next-previous">
        <button
          onClick={() => {
            if (page > 1) setPage(page - 1);
            setX(page - 1);
          }}
          className="previous"
          disabled={page === 1}
        >
          <Image src={previous} width={35} height={35} alt="previous" />
        </button>

        <div>
          {user?.works.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  setX(i + 1);
                }}
                className="indicator-buttons"
              >
                <Image src={radiobutton} width={15} height={15} alt="button" />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setPage(page + 1);
            setX(page + 1);
          }}
          disabled={page === dolzina}
        >
          <Image
            src={next}
            width={35}
            height={35}
            alt="next"
            className="previous"
          />
        </button>
      </div>
    </div>
  );
}
