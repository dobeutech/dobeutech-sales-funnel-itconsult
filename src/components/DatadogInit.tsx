"use client";

import { useEffect } from "react";
import { initDatadog } from "@/lib/datadog/rum";

export function DatadogInit() {
  useEffect(() => {
    initDatadog();
  }, []);

  return null;
}
