"use client";

import ArrRgt from "@/public/assets/icon-arrow-right.svg";

import { useDarkMode } from "../_contexts/DarkModeContext";
import { formatCurrency, formatDate } from "../_lib/data-services";
import Image from "next/image";
import Link from "next/link";

function InvoiceItem({ inv }) {
  const { isDarkMode } = useDarkMode();

  const { status, clientName, total, paymentDue, id } = inv;

  return (
    <Link
      href={`/${id}`}
      className={`${
        isDarkMode ? "bg-darkMode-thirday" : "bg-lightMode-thirday"
      } rounded-md px-6 py-4 shadow-lg flex lg:items-center justify-between w-full`}
    >
      <FlexDiv>
        <div className="flex">
          <span className="text-accentPink-400 text-3xl font-bold">#</span>
          <h1 className="text-2xl font-bold uppercase">{id}</h1>
        </div>

        <p className="text-accentPink-400 text-lg font-bold">
          Due {formatDate(paymentDue)}
        </p>
      </FlexDiv>

      <p className="text-accentPink-400 text-lg font-bold capitalize text-start md:flex hidden">
        {clientName}
      </p>
      <FlexDiv className="items-cente">
        <p className="text-accentPink-400 text-lg font-bold capitalize text-start md:hidden flex">
          {clientName}
        </p>
        <p className="font-bold text-xl">{formatCurrency(total)}</p>
        <InvoiceStatus status={status ? status : "draft"}>
          {status ? status : "draft"}
        </InvoiceStatus>

        <div className="h-4 relative w-2 hidden lg:flex">
          <Image
            src={ArrRgt}
            fill
            alt="arrow-right"
            className="object-cover object-top"
          />
        </div>
      </FlexDiv>
    </Link>
  );
}

export function InvoiceStatus({ status, children }) {
  return (
    <button
      className={`${
        status === "pending"
          ? "bg-accents-pending-50 text-accents-pending-100"
          : status === "paid"
          ? "bg-accents-paid-50 text-accents-paid-100"
          : "bg-accents-draft-50 text-accents-draft-100"
      } p-3 flex items-center justify-center gap-2 text-2xl rounded-md capitalize w-32 `}
    >
      <div
        className={`h-3 w-3 ${
          status === "pending"
            ? "bg-accents-pending-100"
            : status === "paid"
            ? "bg-accents-paid-100 text-accents-paid-100"
            : "bg-accents-draft-100 text-accents-draft-100"
        } rounded-full`}
      ></div>

      <span>{children}</span>
    </button>
  );
}

export function FlexDiv({ children, className }) {
  return (
    <div
      className={`flex flex-col gap-8 lg:items-start lg:flex-row ${className}`}
    >
      {children}
    </div>
  );
}

export default InvoiceItem;
