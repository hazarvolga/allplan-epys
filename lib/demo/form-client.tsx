"use client";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { submitDemo } from "@/app/actions/demo";
import type { DemoState } from "./service";
import {
  submissionIdentity,
  type SubmissionIdentity,
} from "./submission-identity";
const fields = [
  { name: "name", label: "Ad soyad", max: 120, autoComplete: "name" },
  {
    name: "email",
    label: "İş e-postası",
    max: 254,
    autoComplete: "email",
    type: "email",
  },
  {
    name: "company",
    label: "Firma/ofis",
    max: 160,
    autoComplete: "organization",
  },
  { name: "discipline", label: "Disiplin", max: 120 },
  { name: "software", label: "Mevcut yazılım", max: 160 },
  { name: "projectType", label: "Proje türü", max: 160 },
  {
    name: "phone",
    label: "Telefon (isteğe bağlı)",
    max: 40,
    autoComplete: "tel",
    type: "tel",
  },
] as const;
const initialState: DemoState = { status: "idle" };
export function DemoFormClient({ enabled }: { enabled: boolean }) {
  const requestIdentity = useRef<SubmissionIdentity | undefined>(undefined);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [state, action, pending] = useActionState(
    async (previous: DemoState, form: FormData) => {
      requestIdentity.current = await submissionIdentity(
        form,
        requestIdentity.current,
      );
      form.set("requestId", requestIdentity.current.requestId);
      const result = await submitDemo(previous, form);
      if (result.status === "success") {
        setValues({});
        setConsent(false);
      }
      return result;
    },
    initialState,
  );
  const locked = !enabled || pending || state.status === "success";
  return (
    <form
      action={action}
      onReset={(event) => event.preventDefault()}
      className="demo-form"
      aria-describedby={!enabled ? "demo-unavailable" : undefined}
    >
      {!enabled && (
        <p id="demo-unavailable" className="form-status">
          Demo talep formu, yayıncı bilgileri ve veri işleme altyapısı
          tamamlandığında açılacaktır.
        </p>
      )}
      <fieldset
        disabled={locked}
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        <legend className="sr-only">Demo talebi bilgileri</legend>
        <div className="form-grid">
          {fields.map((field) => (
            <div className="field" key={field.name}>
              <label htmlFor={`demo-${field.name}`}>{field.label}</label>
              <input
                className="input"
                id={`demo-${field.name}`}
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.name]: event.target.value,
                  }))
                }
                type={"type" in field ? field.type : "text"}
                autoComplete={
                  "autoComplete" in field ? field.autoComplete : undefined
                }
                required={field.name !== "phone"}
                maxLength={field.max}
                aria-invalid={!!state.errors?.[field.name]}
                aria-describedby={
                  state.errors?.[field.name] ? `error-${field.name}` : undefined
                }
              />
              {state.errors?.[field.name] && (
                <p id={`error-${field.name}`} className="field-error">
                  {state.errors[field.name].join(" ")}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="field">
          <label htmlFor="demo-topic">Görüşme konusu</label>
          <textarea
            className="input"
            id="demo-topic"
            name="topic"
            value={values.topic ?? ""}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                topic: event.target.value,
              }))
            }
            required
            minLength={2}
            maxLength={2000}
            rows={5}
            aria-invalid={!!state.errors?.topic}
            aria-describedby={state.errors?.topic ? "error-topic" : undefined}
          />
          {state.errors?.topic && (
            <p id="error-topic" className="field-error">
              {state.errors.topic.join(" ")}
            </p>
          )}
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clipPath: "inset(50%)",
          }}
        >
          <label htmlFor="demo-website">Web sitesi</label>
          <input
            id="demo-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="consent-label" htmlFor="demo-consent">
          <input
            id="demo-consent"
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
            aria-invalid={!!state.errors?.consent}
            aria-describedby={
              state.errors?.consent ? "error-consent" : undefined
            }
          />{" "}
          <span>
            <Link href="/tr/kvkk">KVKK aydınlatma metnini</Link> okudum. Demo
            talebim için paylaştığım kişisel verilerimin işlenmesine açık rıza
            veriyorum.
          </span>
        </label>
        {state.errors?.consent && (
          <p id="error-consent" className="field-error">
            {state.errors.consent.join(" ")}
          </p>
        )}
        <button type="submit" className="button" disabled={locked}>
          {pending ? "Gönderiliyor…" : "Demo talebimi gönder"}
        </button>
      </fieldset>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="form-status"
      >
        {state.message}
      </div>
    </form>
  );
}
