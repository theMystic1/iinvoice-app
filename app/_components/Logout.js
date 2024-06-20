import { signOutAction } from "../_lib/actions";

function Logout() {
  return (
    <form action={signOutAction}>
      <button className="border-accentPink-400 text-accentPink-0 text-sm md:text-lg border p-2 rounded-md">
        &larr; Logout
      </button>
    </form>
  );
}

export default Logout;
