export const track = async (event: string, properties?: Record<string, unknown>) => {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, properties }),
    });
  } catch {
    // silently fail — analytics should never block the UX
  }
};
