/**
 * Field Renderer Resolver
 *
 * This module maps string identifiers from form0.config.js to actual
 * React component implementations. Using explicit imports (rather than
 * dynamic imports) ensures better tree-shaking and bundler optimization.
 *
 * To add a custom renderer:
 * 1. Create your component in this directory (e.g., my-custom-field.jsx)
 * 2. Import it at the top of this file
 * 3. Add an entry to RENDERER_MAP with a unique identifier
 * 4. Reference that identifier in form0.config.js fieldRenderers section
 */

import { DateField as Form0DateField } from './date-field.jsx';
import { DateFieldShadcn as Form0DateFieldShadcn } from './date-field-shadcn.jsx';

/**
 * Map of renderer identifiers to component implementations
 *
 * Keys: String identifiers used in form0.config.js
 * Values: React component functions
 */
const RENDERER_MAP = {
  'date-field': Form0DateField,
  'date-field-shadcn': Form0DateFieldShadcn,
};

/**
 * Resolves a renderer identifier to its component implementation
 *
 * @param {string} name - Renderer identifier from config
 * @returns {React.Component | undefined} The component, or undefined if not found
 */
export function resolveRenderer(name) {
  const renderer = RENDERER_MAP[name];
  
  if (!renderer) {
    console.warn(
      `[form0] Renderer "${name}" not found in resolver map. ` +
      `Available renderers: ${Object.keys(RENDERER_MAP).join(', ')}`
    );
  }
  
  return renderer;
}

/**
 * Returns all available renderer identifiers
 *
 * @returns {string[]} Array of available renderer names
 */
export function getAvailableRenderers() {
  return Object.keys(RENDERER_MAP);
}

