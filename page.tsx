import demo from "@/data/demo.json";

export default function Home() {
  return (
    <main>

      <section>
        <h1>{demo.headline}</h1>

        <p>
          {demo.subheadline}
        </p>

        <button>
          {demo.cta}
        </button>
      </section>

      <section>
        {demo.sections.map((item) => (
          <div key={item}>
            {item}
          </div>
        ))}
      </section>

    </main>
  );
}
