"use client";

import { useState } from "react";
import { useDarkMode } from "../_contexts/DarkModeContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import checkImg from "@/public/assets/icon-check.svg";
import Image from "next/image";

function FilterItems({ onOpen }) {
  const { isDarkMode } = useDarkMode();
  const items = ["all", "draft", "pending", "paid"];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("status", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div
      className={`shadow-lg flex flex-col gap-4 top-12 left-[-40px]  absolute p-6 pr-10 ${
        isDarkMode ? "bg-darkMode-thirday" : "bg-lightMode-thirday"
      } md:w-60`}
    >
      {items.map((item) => (
        <Item
          item={item}
          key={item}
          onClick={() => {
            handleFilter(item);
            onOpen();
          }}
          activeFilter={activeFilter}
        />
      ))}
    </div>
  );
}

function Item({ item, onClick, activeFilter }) {
  return (
    <button className="flex gap-4" onClick={onClick}>
      <span
        className={`relative h-6 w-6 rounded ${
          activeFilter === item ? "bg-accentPink-200" : "bg-accentPink-0"
        } border border-accentPink-200 items-center justify-center`}
      >
        {activeFilter === item ? (
          <Image src={checkImg} alt="check" fill className="object-contain " />
        ) : null}
      </span>
      <p className="text-xl font-bold capitalize ">{item}</p>
    </button>
  );
}

export default FilterItems;
