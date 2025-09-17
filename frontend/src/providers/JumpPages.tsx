"use client";
import { useRouter } from "next/navigation";

export const JumpPages = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2 justify-end px-10 m-x-auto">
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => router.push("/admin")}>admin</button>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => router.push("/host")}>host</button>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => router.push("/student")}>student</button>
    </div>
  );
};
