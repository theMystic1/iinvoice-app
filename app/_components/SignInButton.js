import Image from "next/image";
import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <div>
      <h1 className="font-bold text-secondary-50 capitalize text-center text-xl mb-8">
        Sign in with google
      </h1>
      <form action={signInAction}>
        <button className="flex items-center gap-6 text-lg border border-accentPink-400 px-10 py-4  hover:text-primary-50  font-medium">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
}

export default SignInButton;
