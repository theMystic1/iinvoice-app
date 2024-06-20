import BackBtn from "../_components/BackBtn";
import FormEditCreate from "../_components/FormEditCreate";
import ReceiptDetails from "../_components/ReceiptDetails";
import ReceiptHeader, { FooterBtn } from "../_components/ReceiptHeader";
import { getReceiptById } from "../_lib/data-services";

export async function generateMetadata({ params }) {
  const Receipt = await getReceiptById(params.ReceiptId);
  return {
    title: `Invoice # ${Receipt.id}`,
  };
}

async function page({ params, searchParams }) {
  const { ReceiptId } = params;

  const Receipt = await getReceiptById(ReceiptId);
  return (
    <>
      <div className="relative">
        <BackBtn />
        <ReceiptHeader inv={Receipt} />
        <ReceiptDetails receipt={Receipt} />
        <FooterBtn receipt={Receipt} />
      </div>
      <FormEditCreate searchParams={searchParams} receipt={Receipt} />
    </>
  );
}

export default page;
