"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDarkMode } from "../_contexts/DarkModeContext";
import Button from "./Button";
import { InvoiceStatus } from "./InvoiceItem";
import { deleteReceipt, updateStatus } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { useState, useTransition } from "react";
import Modal from "./Modal";
// import { useRouter } from "next/router";

function ReceiptHeader({ inv }) {
  const { status, clientName } = inv;
  const { isDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const { pending } = useFormStatus();
  const [pending, setPending] = useState(false);
  const [isPending, startTransition] = useTransition();

  const paramType = searchParams.get("type") ?? "";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("type", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleDelete() {
    startTransition(async () => await deleteReceipt(inv.id));

    router.replace("/");
  }

  async function handleStatus() {
    setPending(true);
    try {
      await updateStatus(inv.id);
    } catch (error) {
      throw new Error(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl font-bold">Confirm Deletion</h1>
          <p className="text-accentPink-400">
            Are you sure you want to delete invoice #{inv.id} action cannot be
            undone
          </p>

          <div className="flex justify-end gap-4">
            <Button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="danger" onClick={handleDelete}>
              {isPending ? "Deleting Invoice" : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>

      <div
        className={`${
          isDarkMode ? "bg-darkMode-thirday" : "bg-lightMode-thirday"
        } rounded-md px-6 py-8 md:py-4 shadow-lg flex lg:items-center justify-between items-center w-full`}
      >
        <div className="flex  items-center justify-between  md:gap-4 w-full md:w-1/4">
          <p className="text-accentPink-400 text-lg font-bold capitalize text-start  flex">
            Status
          </p>

          <InvoiceStatus status={status ? status : "draft"}>
            {status ? status : "draft"}
          </InvoiceStatus>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center  md:gap-4">
          <Button type="reg" onClick={() => handleFilter("edit")}>
            Edit
          </Button>
          <Button type="danger" onClick={() => setIsModalOpen(true)}>
            Delete
          </Button>
          {/* <form action={}> */}
          {inv.status === "paid" ? null : (
            <Button type="invoice" onClick={handleStatus}>
              {pending ? "Changng..." : "Mark as Paid"}
            </Button>
          )}
          {/* </form>{" "} */}
        </div>
      </div>
    </>
  );
}

export function FooterBtn({ receipt }) {
  const { isDarkMode } = useDarkMode();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [ispending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const paramType = searchParams.get("type") ?? "";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("type", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleDelete() {
    startTransition(async () => await deleteReceipt(receipt.id));

    router.replace("/");
  }

  async function handleStatus() {
    setPending(true);
    try {
      await updateStatus(receipt.id);
    } catch (error) {
      throw new Error(error);
    } finally {
      setPending(false);
    }
  }
  return (
    <>
      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl font-bold">Confirm Deletion</h1>
          <p className="text-accentPink-400">
            Are you sure you want to delete invoice #{receipt.id} action cannot
            be undone
          </p>

          <div className="flex justify-end gap-4">
            <Button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="danger" onClick={handleDelete}>
              {isPending ? "Deleting Invoice" : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
      <div
        className={`flex md:hidden items-center justify-between  md:gap-4 ${
          isDarkMode ? "bg-darkMode-thirday" : "bg-lightMode-thirday"
        } w-full absolute bottom-[-50px] px-2 py-4`}
      >
        <Button type="reg" onClick={() => handleFilter("edit")}>
          Edit
        </Button>

        <Button type="danger" onClick={() => setIsModalOpen(true)}>
          Delete
        </Button>
        {receipt.status === "paid" ? null : (
          <Button type="invoice" onClick={handleStatus}>
            {ispending ? "Changng..." : "Mark as Paid"}
          </Button>
        )}
      </div>
    </>
  );
}

export default ReceiptHeader;
