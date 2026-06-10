import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type DemoSection = {
  title: string;
  description: string;
};

type DemoData = {
  companyName: string;
  responsibleName?: string;
  segment?: string;
  city?: string;
  instagram?: string;
  whatsapp?: string;
  headline: string;
  subheadline: string;
  cta: string;
  primaryPain?: string;
  mainPromise?: string;
  sections: DemoSection[];
  whatsappMessage?: string;
};

function getDemo(slug: string): DemoData | null {
  const filePath = path.join(process.cwd(), "src", "data", "demos", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");
  return JSON.parse(file);
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);

  if (!demo) {
    notFound();
  }

  const whatsappNumber = demo.whatsapp?.replace(/\D/g, "");
  const message = encodeURIComponent(
    demo.whatsappMessage || `Olá, vim pela demonstração da ${demo.companyName}`
  );

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/55${whatsappNumber}?text=${message}`
    : "#";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Demo FlowtechAM
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          {demo.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">
          {demo.subheadline}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={whatsappUrl}
            className="rounded-xl bg-emerald-400 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            {demo.cta}
          </a>

          {demo.instagram && (
            <a
              href={`https://instagram.com/${demo.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Ver Instagram
            </a>
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Oportunidade identificada</h2>

          <p className="mt-4 max-w-3xl text-zinc-300">
            {demo.primaryPain || demo.mainPromise}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">Como essa estrutura ajuda</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {demo.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-zinc-300">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-400 px-6 py-20 text-zinc-950">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            {demo.companyName}, essa é uma prévia do que podemos construir.
          </h2>

          <p className="mt-4 max-w-3xl text-lg">
            A proposta final pode incluir site profissional, funil de conversão,
            integração com WhatsApp, automações e CRM para organizar os contatos.
          </p>

          <a
            href={whatsappUrl}
            className="mt-8 inline-block rounded-xl bg-zinc-950 px-6 py-4 font-semibold text-white"
          >
            Quero melhorar minha presença digital
          </a>
        </div>
      </section>
    </main>
  );
}
