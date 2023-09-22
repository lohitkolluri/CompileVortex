const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then((webVitals) => {
      ["getCLS", "getFID", "getFCP", "getLCP", "getTTFB"].forEach((fn) => {
        if (typeof webVitals[fn] === "function") {
          webVitals[fn](onPerfEntry);
        }
      });
    });
  }
};

export default reportWebVitals;
