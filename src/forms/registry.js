export const PAGE_VARIANTS = ['standard', 'simplified'];
export const OVERLAY_VARIANTS = ['modal', 'spotlight'];

// Presentation key constants (used for looking up presentation settings)
export const DEFAULT_PAGE_VARIANT_KEY = 'standard';
export const DEFAULT_OVERLAY_VARIANT_KEY = 'modal';

const forms = [
  {
    id: 'demo-form',
    title: 'Demo Enrollment',
    description: 'A showcase schema with a bit of everything to exercise the renderer.',
    tags: ['demo', 'kitchen-sink'],
    loadSchema: () => import('./demo/schema.json'),
    initialValues: {
      age: 18,
    },
  },
  {
    id: 'demo-form-bis',
    title: 'Demo Enrollment Bis',
    description: 'A showcase schema with a bit of everything to exercise the renderer.',
    tags: ['demo', 'test'],
    loadSchema: () => import('./demo-bis/schema.json'),
  },
  {
    id: 'demo-form-ter',
    title: 'Demo EnrollmentTer',
    description: 'A showcase schema with a bit of everything to exercise the renderer.',
    tags: ['demo', 'test'],
    loadSchema: () => import('./demo-ter/schema.json'),
  }
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
