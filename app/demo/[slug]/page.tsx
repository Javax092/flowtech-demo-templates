import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type DemoSection =
  | string
  | {
      title?: string;
      description?: string;
    };

type Demo = {
  companyName?: string;
  responsibleName?: string;
  segment?: string;
  city?: string;
  instagram?: string;
  whatsapp?: string;
  headline?: string;
  subheadline?: string;
  cta?: string;
  sections?: DemoSection[];
};

function getDemo(slug: string): Demo | null {
  const filePath = path.join(
    process.cwd(),
    "demos-flowtech",
    "src",
    "data",
    "demos",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function renderSection(section: DemoSection, index: number) {
  if (typeof section === "string") {
    return section;
  }

  return (
    <>
      <strong>{section.title || `Seção ${index + 1}`}</strong>
      <br />
      <span>{section.description || ""}</span>
    </>
  );
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

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <p>Demo personalizada FlowtechAM</p>

      <h1>{demo.headline}</h1>
      <h2>{demo.subheadline}</h2>

      <p>
        Empresa: <strong>{demo.companyName}</strong>
      </p>

      <p>
        Cidade: <strong>{demo.city}</strong>
      </p>

      <p>
        Segmento: <strong>{demo.segment}</strong>
      </p>

      <ul>
        {(demo.sections || []).map((section, index) => (
          <li key={index}>{renderSection(section, index)}</li>
        ))}
      </ul>

      <a
        href={
          demo.whatsapp
            ? `https://wa.me/55${demo.whatsapp}`
            : "https://wa.me/5592982019100"
        }
        target="_blank"
      >
        {demo.cta || "Falar no WhatsApp"}
      </a>
    </main>
  );
}
