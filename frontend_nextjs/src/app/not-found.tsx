import React from "react";

export default function NotFound() {
  return (
    <main className="container-fluid py-10">
      <section className="card ocean-gradient p-10 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold mb-2">404 – Page Not Found</h1>
        <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
