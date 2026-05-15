"use client";

import { Button } from "@/components/button";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center" }}>
        Welcome to Finova
      </h1>
      <p style={{ fontSize: "1.125rem", color: "#6c757d", textAlign: "center" }}>
        Your financial platform, built for scale.
      </p>
      <Button
        variant="primary"
        size="lg"
        onClick={() => alert("Get started clicked!")}
      >
        Get Started
      </Button>
    </main>
  );
}
