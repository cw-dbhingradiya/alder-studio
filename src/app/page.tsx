"use client";

import LandingPage from "./landing-page/LandingPage";

/**
 * What: Root page; always shows the landing page.
 * Why: After login users stay on landing; they go to /dashboard via profile dropdown.
 */
export default function HomePage() {
  return <LandingPage />;
}
