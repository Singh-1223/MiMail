"use client"

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const { data: session } = useSession();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (apiKey.trim() !== "") {
      localStorage.setItem("openApiKey", apiKey);
      // Redirect to Google OAuth login
      // const result = await signIn("google", { callbackUrl: "/emails" });
      const result = await signIn("google", { callbackUrl: "/emails" });
      if (result?.error) {
        alert("Sign in was not successful. Please try again.");
      }
    } else {
      alert("Please enter a valid API key.");
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="p-[50px] m-2 flex flex-col items-center ">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <button
            type="submit"
            className="justify-center border border-gray-500 py-3 px-6 rounded-3xl bg-slate-400 text-pretty text-2xl text-orange-950 mb-4"
          >
            Login
          </button>
          <div>
            <input
              type="text"
              className="rounded-[20px] text-center p-2 bg-slate-100 text-slate-700 font-semibold"
              name="key"
              id="key"
              aria-describedby="helpId"
              placeholder="Enter OPEN API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
