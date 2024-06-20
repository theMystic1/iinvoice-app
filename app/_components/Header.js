"use client";

import Image from "next/image";
import ArrRgt from "@/public/assets/icon-arrow-down.svg";

import cross from "@/public/assets/icon-plus.svg";

import Button from "./Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItems from "./FilterItems";
import { useState } from "react";

function Header({ invoiceLength }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const paramType = searchParams.get("type") ?? "";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("type", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleOpenFilter() {
    setIsOpen((iso) => !iso);
  }

  return (
    <header className={`flex justify-between items-center  mb-12`}>
      <div>
        <h1 className="md:text-4xl font-bold  text-2xl">Invoices</h1>
        <p className="text-lg hidden md:flex text-accentPink-400">
          There are {invoiceLength} total Invoices
        </p>

        <p className="text-lg md:hidden text-accentPink-400">
          {invoiceLength} Invoices
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <span
          className="flex cursor-pointer items-center gap-4"
          onClick={handleOpenFilter}
        >
          <span className="relative">
            <h1 className="font-bold text-lg md:flex hidden">
              Filter by status
            </h1>

            {isOpen ? <FilterItems onOpen={handleOpenFilter} /> : null}
            <h1 className="font-bold text-lg md:hidden">Filter</h1>
          </span>

          <div className="h-2 relative w-4">
            <Image
              src={ArrRgt}
              fill
              alt="arrow-right"
              className="object-cover object-top"
            />
          </div>
        </span>

        <Button type="invoice" onClick={() => handleFilter("new")}>
          <div className="md:h-10 flex bg-lightMode-primary items-center justify-center rounded-full h-6 w-6 md:w-10">
            <span className="h-3 w-3 relative">
              <Image
                src={cross}
                fill
                alt="arrow-right"
                className="object-cover object-top"
              />
            </span>
          </div>
          <span className="font-bold md:hidden">New</span>

          <span className="font-bold md:flex hidden">New Invoice</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
