"use client";

import React from "react";
import { useDarkMode } from "../_contexts/DarkModeContext";
import { formatCurrency, formatDate } from "../_lib/data-services";

function ReceiptDetails({ receipt }) {
  const { isDarkMode } = useDarkMode();

  const {
    id,
    paymentDue,
    senderAddress,
    total,
    clientEmail,
    clientAddress,
    createdAt,
    items,
    description,
    clientName,
  } = receipt;

  return (
    <div
      className={`${
        isDarkMode ? "bg-darkMode-thirday" : "bg-lightMode-thirday"
      } rounded-md px-8 py-4 shadow-lg flex flex-col  mt-10`}
    >
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between md:items-center mb-8">
        <div className="flex flex-col">
          <div className="flex">
            <span className="text-accentPink-400 text-xl md:text-2xl font-bold">
              #
            </span>
            <h1 className="text-xl md:text-2xl font-bold uppercase">{id}</h1>
          </div>
          <p className="text-accentPink-400 text-lg font-bold">{description}</p>
        </div>
        <ul className="flex flex-col md:items-end">
          <AddressList>{senderAddress.street}</AddressList>
          <AddressList>{senderAddress.city}</AddressList>
          <AddressList>{senderAddress.postCode}</AddressList>
          <AddressList>{senderAddress.country}</AddressList>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-[1fr,1fr,1.8fr]">
        <div className="flex flex-col gap-2">
          <h3 className="text-accentPink-400 text-lg font-bold mb-8">
            Invoice Date
          </h3>

          <h1 className="text-xl md:text-2xl font-bold capitalize">
            {formatDate(createdAt)}
          </h1>

          <p className="text-accentPink-400 text-lg font-bold">Payment Due</p>

          <h1 className="text-xl md:text-2xl font-bold capitalize">
            {paymentDue}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-accentPink-400 text-lg font-bold mb-8">
            Bill To
          </h3>

          <h1 className="text-xl md:text-2xl font-bold capitalize">
            {clientName}
          </h1>

          <ul className="flex flex-col gap-2">
            <AddressList>{clientAddress.street}</AddressList>
            <AddressList>{clientAddress.city}</AddressList>
            <AddressList>{clientAddress.postCode}</AddressList>
            <AddressList>{clientAddress.country}</AddressList>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-accentPink-400 mb-8 text-lg font-bold">
            Sent to
          </h3>

          <h1 className="text-xl md:text-2xl font-bold ">{clientEmail}</h1>
        </div>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-accentPink-500" : "bg-lightMode-primary"
        } mt-10 px-4 py-4 rounded-t-md`}
      >
        <div className="hidden md:grid grid-cols-[1.8fr,0.5fr,1fr,1fr] gap-4">
          <h3 className="text-accentPink-400 text-lg font-bold">Item Name</h3>
          <h3 className="text-accentPink-400 text-lg font-bold">QTY</h3>
          <h3 className="text-accentPink-400 text-lg font-bold">Price</h3>
          <h3 className="text-accentPink-400 text-lg font-bold">Total</h3>
        </div>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="hidden md:grid grid-cols-[1.8fr,0.5fr,1fr,1fr] gap-4 mt-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-bold capitalize">{item.name}</h1>
              </div>

              <div className="flex flex-col  gap-4">
                <p className="text-accentPink-400 text-lg font-bold">
                  {item.quantity}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-accentPink-400 text-lg font-bold">
                  {formatCurrency(item.price)}
                </p>
              </div>

              <div className="flex flex-col gap-4 items-end">
                <h1 className="text-xl font-bold capitalize">
                  {formatCurrency(item.total)}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between md:hidden">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-bold capitalize">{item.name}</h1>
                <div className="flex gap-4">
                  <div className="flex flex-col  gap-2">
                    <p className="text-accentPink-400 text-lg font-bold">
                      {item.quantity} x
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="text-accentPink-400 text-lg font-bold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-end">
                <h1 className="text-xl font-bold capitalize">
                  {formatCurrency(item.total)}
                </h1>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="bg-darkMode-thirday text-lightMode-primary flex justify-between rounded-b-md px-4 py-8">
        <h3 className="font-bold">Amount Due</h3>
        <h1 className="text-xl font-bold capitalize">
          {formatCurrency(total)}
        </h1>
      </div>
    </div>
  );
}

function AddressList({ children }) {
  return <li className="text-accentPink-400 text-lg font-bold">{children}</li>;
}

export default ReceiptDetails;
