const steps = [
  ["Create a free account", "Go to sanity.io/login and sign in with Google or GitHub."],
  [
    "Create a project",
    'Name it "First Key International" and choose the "production" dataset. Copy the Project ID it gives you.',
  ],
  [
    "Add the ID to this site",
    "Create a file named .env.local in the project root with:  NEXT_PUBLIC_SANITY_PROJECT_ID=your-id-here",
  ],
  [
    "Allow this site to talk to Sanity",
    "In sanity.io/manage → API → CORS origins, add http://localhost:3000 and your live domain, both with credentials allowed.",
  ],
  ["Restart the dev server", "Stop it and run npm run dev again, then reload /studio."],
];

export default function SetupNotice() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "140px 24px 100px" }}>
      <h1 className="h2">Finish connecting Sanity</h1>
      <p className="lead" style={{ marginTop: 16 }}>
        The blog is ready — it just needs a Sanity project to read from. Five
        steps, once:
      </p>
      <ol className="prose" style={{ marginTop: 32, paddingLeft: 20 }}>
        {steps.map(([title, detail]) => (
          <li key={title} style={{ marginBottom: 18 }}>
            <strong>{title}</strong>
            <br />
            <span style={{ color: "var(--slate)" }}>{detail}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
