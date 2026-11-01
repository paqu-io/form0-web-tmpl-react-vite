import { starterForms } from "./catalog.js";

export const PAGE_VARIANTS = ["standard", "simplified"];
export const OVERLAY_VARIANTS = ["modal", "spotlight"];

// Presentation key constants (used for looking up presentation settings)
export const DEFAULT_PAGE_VARIANT_KEY = "standard";
export const DEFAULT_OVERLAY_VARIANT_KEY = "modal";

// Keep a literal forms array so the CLI can add, update, and remove registrations.
const forms = [
  {
    ...starterForms[0],
    id: "nature-observation",
    loadSchema: () => import("./nature-observation/schema.json"),
  },
  {
    ...starterForms[1],
    id: "equipment-checkout",
    loadSchema: () => import("./equipment-checkout/schema.json"),
  },
  {
    ...starterForms[2],
    id: "building-condition-survey",
    loadSchema: () => import("./building-condition-survey/schema.json"),
  },
];

export const DEFAULT_FORM_ID = forms[0]?.id ?? null;
export const DEFAULT_PAGE_VARIANT = PAGE_VARIANTS[0];
export const DEFAULT_OVERLAY_VARIANT = OVERLAY_VARIANTS[0];

export function listForms() {
  return forms;
}

export function getFormById(formId) {
  return forms.find((form) => form.id === formId);
}

export async function loadSchemaForForm(formId) {
  const definition = getFormById(formId);

  if (!definition) {
    throw new Error(`Unknown form id: ${formId}`);
  }

  const module = await definition.loadSchema();
  return module.default ?? module;
}

export const FORM_VARIANT_OPTIONS = {
  page: PAGE_VARIANTS,
  overlay: OVERLAY_VARIANTS,
};
