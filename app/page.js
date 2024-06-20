import FormEditCreate from "./_components/FormEditCreate";
import Header from "./_components/Header";
import InvoiceItem from "./_components/InvoiceItem";
import { auth } from "./_lib/auth";
import { getAllReceipts } from "./_lib/data-services";

async function page({ searchParams }) {
  const Invoice = await getAllReceipts();
  const filter = searchParams?.status ?? "";

  let invoices;
  if (filter === "" || filter === "all") invoices = Invoice;
  else invoices = Invoice.filter((invoice) => invoice.status === filter);

  return (
    <>
      <div className="">
        <Header invoiceLength={invoices.length} />
        <main className="grid gap-6 ">
          {invoices.map((inv) => (
            <InvoiceItem key={inv.id} inv={inv} />
          ))}
        </main>
      </div>

      <FormEditCreate searchParams={searchParams} />
    </>
  );
}

export default page;
