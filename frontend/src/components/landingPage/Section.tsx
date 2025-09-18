import { Trophy } from "lucide-react";

export const Section = () => {
  return (
    <div className="flex gap-x-2">
      <div className="flex flex-col gap-x-2">
        <p className="flex gap-x-2">
          <Trophy width={20} height={20} className="text-sm font-bold" />
          Education Excellence Platform
        </p>

        <h1>Elevate Academic</h1>
        <h2>Competition</h2>
        <h3>Excellence</h3>
      </div>
    </div>
  );
};
