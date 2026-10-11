"use client";
import { useState } from "react";
import { Drawing } from "./drawing";
export function Scenario({ steps }: { steps: readonly string[] }) {
  const [step, setStep] = useState(0);
  return (
    <div className="scenario-interactive">
      <div
        className="scenario-steps"
        role="group"
        aria-label="Örnek iş akışı adımları"
      >
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
          >
            <span className="mono">0{i + 1}</span>
            <span>{label}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
        <p className="scenario-caption mono" aria-live="polite">
          0{step + 1} / {steps[step]} — örnek gösterim
        </p>
      </div>
      <Drawing compact step={step} />
    </div>
  );
}
