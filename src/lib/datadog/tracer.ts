import tracer from "dd-trace";

if (process.env.DD_TRACE_ENABLED !== "false") {
  tracer.init({
    service: process.env.DD_SERVICE || "dobeutech-sales-funnel",
    env: process.env.DD_ENV || process.env.NODE_ENV || "development",
    version: process.env.DD_VERSION || "0.1.0",
    logInjection: true,
    runtimeMetrics: true,
    profiling: process.env.DD_PROFILING_ENABLED === "true",
  });
}

export default tracer;
