import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    value
  );

export const formatDate = (
  date,
  locale = "en-GB",
  options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
) => {
  return new Intl.DateTimeFormat(locale, options)?.format(new Date(date));
};

// supabase
export async function getAllReceipts() {
  const { data: Invoices, error } = await supabase.from("Invoices").select("*");

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return Invoices;
}

export async function getReceiptById(id) {
  const { data: Invoice, error } = await supabase
    .from("Invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    notFound();
    // throw new Error(error.message);
  }

  return Invoice;
}
