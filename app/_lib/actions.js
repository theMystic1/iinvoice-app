"use server";

import { revalidatePath } from "next/cache";
import { formatDate, getReceiptById } from "./data-services";
import { supabase } from "./supabase";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

// Usage example:

async function getFormata(formData) {
  const street = formData.get("street");
  const city = formData.get("city");
  const country = formData.get("country");
  const postCode = formData.get("postCode");
  const clientEmail = formData.get("clientEmail");
  const clientName = formData.get("clientName");
  const clientStreet = formData.get("clientStreet");
  const clientCity = formData.get("clientCity");
  const clientPostCode = formData.get("clientPostCode");
  const clientCountry = formData.get("clientCountry");
  const paymentTerms = formData.get("paymentTerms");
  const paymentDue = formData.get("paymentDue");
  const total = formData.get("total");
  const description = formData.get("description");
  const name = formData.get("name");
  const price = formData.get("price");
  const quantity = formData.get("quantity");
  const status = formData.get("status");

  const newData = {
    id: generateRandomString(6),
    items: [{ total: Number(price), price: Number(price), quantity, name }],
    paymentTerms,
    paymentDue: formatDate(paymentDue),
    total: Number(price),
    description,
    senderAddress: { postCode, street, city, country },
    clientAddress: {
      city: clientCity,
      postCode: clientPostCode,
      country: clientCountry,
      street: clientStreet,
    },
    clientEmail,
    clientName,
    createdAt: new Date().toISOString(),
    status,
  };

  return newData;
}

export async function createNewInvoice(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newData = await getFormata(formData);

  const { error } = await supabase.from("Invoices").insert([newData]);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Invoice could not be created: ${error.message}`);
  }

  revalidatePath("/");

  // Correctly redirect using Next.js
  redirect("/");

  // Return success indication for the client
  return { success: true, message: "Invoice created successfully" };
}

export async function editInvoice(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const invoiceId = formData.get("id");
  const newData = await getFormata(formData);

  const updatedFields = {
    ...newData,
    id: invoiceId,
  };
  // console.log(updatedFields);

  const { error } = await supabase
    .from("Invoices")
    .update(updatedFields)
    .eq("id", invoiceId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(`/${invoiceId}`);
  redirect(`/${invoiceId}`);
}

export async function updateStatus(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const receipt = await getReceiptById(id);

  const updatedFields = {
    ...receipt,
    status: "paid",
  };

  const { error } = await supabase
    .from("Invoices")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(`/${id}`);
}

export async function deleteReceipt(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.from("Invoices").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Invoice could not be deleted");
  }

  revalidatePath("/");
  redirect("/");
}
