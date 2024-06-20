"use client";

import { useState } from "react";
import { createNewInvoice, editInvoice } from "../_lib/actions";
import FormItems, { FooterBtn } from "./FormItems";

function FormEditCreate({ searchParams, receipt }) {
  const [status, setStatus] = useState("pending");

  if (searchParams.type === "edit")
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
          searchParams?.type ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500`}
      >
        <form
          className={`min-h-screen w-full md:w-[80%]  lg:w-[60%] xl:w-[50%] rounded-r-lg fixed bottom-0 left-0 top-0 z-30  ${
            searchParams?.type ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-500`}
          action={editInvoice}
        >
          <FormItems
            receipt={receipt}
            searchParams={searchParams}
            status={status}
          />
          <FooterBtn setStatus={setStatus} />
        </form>
      </div>
    );

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        searchParams?.type ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-500`}
    >
      <form
        className={`min-h-screen w-full md:w-[80%]  lg:w-[60%] xl:w-[50%] rounded-r-lg fixed bottom-0 left-0 top-0 z-30  `}
        action={createNewInvoice}
      >
        <FormItems
          receipt={receipt}
          status={status}
          searchParams={searchParams}
        />
        <FooterBtn setStatus={setStatus} />
      </form>
    </div>
  );
}

export default FormEditCreate;
