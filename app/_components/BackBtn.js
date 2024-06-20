import Link from "next/link";

import backArr from "@/public/assets/icon-arrow-left.svg";
import Image from "next/image";

function BackBtn() {
  return (
    <Link href="/" className="flex gap-2 mb-4 w-20 items-center ">
      <span className="w-2 relative h-2">
        <Image src={backArr} alt="back button" fill className="object-cover" />
      </span>

      <span className="text-accentPink-400">Back</span>
    </Link>
  );
}

export default BackBtn;
