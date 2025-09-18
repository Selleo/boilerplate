import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Selleo Remix" },
    { name: "description", content: "Welcome to the Selleo!" },
  ];
};

export const clientLoader = async () => {
  return { date: new Date() };
};

export default function LandingPage() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="px-4">
      <div className="relative w-[300px] h-[300px] mx-auto mt-20">
        <img
          src="brand.svg"
          alt="brand"
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="brand.svg"
          alt="brand"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 blur-xl z-10 opacity-40 animate-pulse"
        />
      </div>

      <p className="fixed bottom-4 left-1/2 -translate-x-1/2">
        renderedAt: {data.date.toLocaleString()}
      </p>
    </div>
  );
}
