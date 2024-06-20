"use client";

import Image from "next/image";
import { useDarkMode } from "../_contexts/DarkModeContext";
import FormGrid from "./FormGrid";
import Input from "./Input";
// import ArrBtm from "@/public/assets/icon-arrow-down.svg";
// import dateIcon from "@/public/assets/icon-calendar.svg";
import deleteIcon from "@/public/assets/icon-delete.svg";
import crossIcon from "@/public/assets/icon-plus.svg";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import PaymentDate from "./PaymentDate";

function FormItems({ receipt, searchParams, status }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`w-full h-full ${
        isDarkMode
          ? "bg-darkMode-thirday"
          : "bg-lightMode-thirday absolute inset-0"
      } rounded-r-lg px-4 md:px-6  pt-32 xl:pt-16 xl:pl-32 flex flex-col gap-8 pb-20 overflow-y-auto hide-scrollbar`}
    >
      {searchParams.type === "edit" ? (
        <span className="text-2xl flex gap-2">
          <h1 className="font-bold">Edit</h1>
          <p className="text-accentPink-400">#</p>
          <h1 className="font-bold">{receipt?.id}</h1>
        </span>
      ) : searchParams.type === "new" ? (
        <h1 className="text-2xl font-bold">New Invoice</h1>
      ) : (
        ""
      )}
      <FlexCol className="flex flex-col gap-4">
        <h3 className="text-accentPink-200 font-bold text-xl capitalize">
          Bill from
        </h3>
        <Input
          label="Street Address"
          defaultValue={receipt?.senderAddress.street}
          name="street"
        />
        <FormGrid className="md:grid-cols-3 gap-4 grid-cols-2">
          <Input
            label="City"
            defaultValue={receipt?.clientAddress.city}
            name="city"
          />
          <input type="hidden" name="status" value={status ? status : ""} />
          <Input
            label="Post Code"
            defaultValue={receipt?.senderAddress.postCode}
            name="postCode"
          />
          <Input
            label="Country"
            defaultValue={receipt?.senderAddress.country}
            name="country"
          />
        </FormGrid>
      </FlexCol>

      <FlexCol className="flex flex-col gap-4">
        <h3 className="text-accentPink-200 font-bold text-xl capitalize">
          Bill To
        </h3>

        <Input
          label="Client's Name"
          defaultValue={receipt?.clientName}
          name="clientName"
        />

        <Input
          label="Client's Email"
          defaultValue={receipt?.clientEmail}
          name="clientEmail"
        />
        <input type="hidden" name="id" value={receipt?.id} />

        <Input
          label="Street Address"
          defaultValue={receipt?.clientAddress.street}
          name="clientStreet"
        />

        <FormGrid className="md:grid-cols-3 gap-4 grid-cols-2">
          <Input
            label="City"
            defaultValue={receipt?.clientAddress.city}
            name="clientCity"
          />
          <Input
            label="Post Code"
            defaultValue={receipt?.clientAddress.postCode}
            name="clientPostCode"
          />
          <Input
            label="Country"
            defaultValue={receipt?.clientAddress.country}
            name="clientCountry"
          />
        </FormGrid>
      </FlexCol>

      <FlexCol className="flex flex-col gap-4">
        {/* <FormGrid className="grid-cols-2 gap-4">
          <Input label="Invoice Date" cat="datePicker">
            <p className="text-accentPink-400 ">
              {formatDate(receipt?.createdAt)}
            </p>
            <span className="relative w-5 h-5">
              <Image src={dateIcon} alt="img" fill className="object-cover" />
            </span>
          </Input>

          <Input label="Payment Terms" cat="datePicker">
            <p>Net 30 days</p>
            <span className="relative w-4 h-2">
              <Image src={ArrBtm} alt="img" fill className="object-cover" />
            </span>
          </Input>
        </FormGrid> */}

        <PaymentDate
          defaultDate={receipt?.createdAt}
          defaultNet={receipt?.paymentTerms}
        />

        <Input
          label="Project description"
          defaultValue={receipt?.description}
          name="description"
        />
      </FlexCol>
      <FlexCol>
        <h3 className="text-accentPink-300 font-bold text-xl capitalize">
          item list
        </h3>
        {searchParams.type === "new" ? (
          <FormGrid className="grid-cols-[1fr,1.5fr,1.5fr,.6fr] md:grid-cols-[1fr,60px,100px,100px,40px] gap-2">
            <div className="hidden md:flex">
              <Input label={"Item Name"} name="name" />
            </div>
            <Input label={"Qty."} name="quantity" />
            <Input label={"Price"} name="price" />
            <Input label={"Total"} cat="p">
              <Input type="hidden" name="total" />
              <p></p>
            </Input>

            <Input label="." cat="p">
              <div className="relative w-5 h-5">
                <Image
                  src={deleteIcon}
                  alt="Delete"
                  fill
                  className="object-cover"
                />
              </div>
            </Input>
          </FormGrid>
        ) : null}

        {receipt?.items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full md:hidden">
              <Input
                label={index === 0 ? "Item Name" : ""}
                defaultValue={item.name}
                name="name"
              />
            </div>

            <FormGrid className="grid-cols-[1fr,1.5fr,1.5fr,.6fr] md:grid-cols-[1fr,60px,100px,100px,40px] gap-2">
              <div className="hidden md:flex">
                <Input
                  label={index === 0 ? "Item Name" : ""}
                  defaultValue={item.name}
                  name="name"
                />
              </div>
              <Input
                label={index === 0 ? "Qty." : ""}
                defaultValue={item.quantity || ""}
                name="quantity"
              />
              <Input
                label={index === 0 ? "Price" : ""}
                defaultValue={item.price.toFixed(2)}
                name="price"
              />
              <Input label={index === 0 ? "Total" : ""} cat="p">
                <p>{item.total.toFixed(2)}</p>
                <Input type="hidden" name="total" />
              </Input>

              <Input label="." cat="p">
                <div className="relative w-5 h-5">
                  <Image
                    src={deleteIcon}
                    alt="Delete"
                    fill
                    className="object-cover"
                  />
                </div>
              </Input>
            </FormGrid>
          </React.Fragment>
        ))}
      </FlexCol>
      <button
        className={`flex justify-center items-center gap-4 h-[60px] py-8 rounded-[30px] font-bold text-xl  text-accentPink-300   ${
          isDarkMode ? "bg-darkMode-primary" : "bg-accentPink-0"
        }`}
      >
        <div className="relative w-4 h-4">
          <Image src={crossIcon} alt="img" fill className="object-cover" />
        </div>

        <span>Add New Item</span>
      </button>
    </div>
  );
}

function FlexCol({ children }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function FooterBtn({ setStatus }) {
  const { isDarkMode } = useDarkMode();

  const { pending, data, method } = useFormStatus();
  // console.log(data, method);

  const router = useRouter();
  const pathname = usePathname();

  const handleClearQueryString = () => {
    router.replace(`${pathname}`);
  };

  function handleClearQuery() {
    if (!pending && method !== null) handleClearQueryString();
  }

  return (
    <div
      className={`flex items-center gap-4 justify-between md:gap-4 ${
        isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-thirday"
      } w-full absolute bottom-0 px-4 md:px-6 pt-8 xl:pl-32`}
    >
      <Button type="button" onClick={handleClearQueryString}>
        Discard
      </Button>
      <div className="flex gap-4">
        <Button type="draft" onClick={() => setStatus("draft")}>
          Save as draft
        </Button>
        <Button type="invoice" onClick={handleClearQuery}>
          {pending ? "Creating invoice..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default FormItems;
