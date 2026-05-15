"use client";

import { Button } from "@/components/atoms/Button";

export function HomeCTA() {
  return (
    <Button variant="primary" size="lg" onClick={() => alert("Get started!")}>
      Get Started
    </Button>
  );
}
