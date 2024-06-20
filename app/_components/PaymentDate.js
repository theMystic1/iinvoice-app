"use client";

import Image from "next/image";
import FormGrid from "./FormGrid";
import Input from "./Input";

import ArrBtm from "@/public/assets/icon-arrow-down.svg";
import dateIcon from "@/public/assets/icon-calendar.svg";
import PaymentTerms from "./PaymentTerms";
import { useState } from "react";
import "react-day-picker/dist/style.css";

import { DayPicker } from "react-day-picker";
import { useDarkMode } from "../_contexts/DarkModeContext";
import { formatDate } from "../_lib/data-services";
import { useSearchParams } from "next/navigation";
// import { formatDate } from "date-fns";

function PaymentDate({ defaultDate, defaultNet }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const initiallySelectedDate = "";
  const [selectedDate, setSelectedDate] = useState(initiallySelectedDate);
  const param = useSearchParams();

  const type = param.get("type");

  const [net, setNet] = useState(null);

  const { isDarkMode } = useDarkMode();

  function handleIsOpen() {
    setIsOpen((iso) => !iso);
  }

  function handleIsOpenDate() {
    setIsOpenDate((iso) => !iso);
  }

  return (
    <FormGrid className="md:grid-cols-2 gap-4">
      <Input label="Invoice Date" cat="datePicker">
        <p className="text-accentPink-400 ">
          {selectedDate === "" && defaultDate
            ? formatDate?.(defaultDate)
            : selectedDate === "" && !defaultDate
            ? ""
            : formatDate(selectedDate)}
        </p>
        <span
          className="relative w-5 h-5 cursor-pointer"
          onClick={handleIsOpenDate}
        >
          <Image src={dateIcon} alt="img" fill className="object-cover" />
        </span>

        {isOpenDate ? (
          <div
            className={`p-4 absolute w-full shadow-2xl  ${
              !isDarkMode ? "bg-lightMode-thirday" : "bg-darkMode-thirday"
            } top-[70px] z-50 flex justify-center rounded-lg`}
          >
            <DayPicker
              mode="single"
              className="pace-self-center"
              captionLayout="buttons"
              hideWeekdayRow
              showOutsideDays
              required
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        ) : null}

        <input
          type="hidden"
          value={defaultDate ? defaultDate : selectedDate}
          name="paymentDue"
        />
      </Input>

      <Input label="Payment Terms" cat="datePicker">
        <p>
          {defaultNet && net === null
            ? `Net ${defaultNet} Day${defaultNet > 1 ? "s" : ""}`
            : net === null && !defaultNet
            ? null
            : `Net ${net} Day${net > 1 ? "s" : ""}`}
        </p>
        <span
          className="relative w-4 h-2 cursor-pointer"
          onClick={handleIsOpen}
        >
          <Image src={ArrBtm} alt="img" fill className="object-cover" />
        </span>
        {isOpen ? (
          <PaymentTerms net={net} onOpen={handleIsOpen} setNet={setNet} />
        ) : null}

        <input
          type="hidden"
          // defaultValue={defaultNet}
          name="paymentTerms"
          value={defaultNet ? defaultNet : net || ""}
        />
      </Input>
    </FormGrid>
  );
}

export default PaymentDate;
