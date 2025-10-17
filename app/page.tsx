import Image from "next/image";
import { getNoteTitles } from "../lib/supabaseClient";

export default async function Home() {
  let titles: string[] = [];
  let error: string | null = null;

  try {
    titles = await getNoteTitles();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = String(err ?? "Unknown error");
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <section className="w-full">
          <h2 className="text-lg font-medium mb-2">Note titles from Supabase</h2>
          {error ? (
            <div className="text-sm text-red-600">Error: {error}</div>
          ) : (
            <ul className="list-disc pl-6">
              {titles.length === 0 ? (
                <li className="text-sm text-muted-foreground">(no notes found)</li>
              ) : (
                titles.map((t, i) => (
                  <li key={i} className="text-sm break-words">
                    {t}
                  </li>
                ))
              )}
            </ul>
          )}
        </section>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
