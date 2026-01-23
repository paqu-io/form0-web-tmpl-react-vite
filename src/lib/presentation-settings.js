import form0Config from '../../form0.config.js';

const baseLayout = form0Config.layout ?? {};
const presentations = form0Config.layout?.presentations ?? {};

function mergeLayout(overrides = {}) {
  return {
    formWidth: overrides.formWidth ?? baseLayout.formWidth,
    labelPosition: overrides.labelPosition ?? baseLayout.labelPosition,
    labelWidthPercent: overrides.labelWidthPercent ?? baseLayout.labelWidthPercent,
  };
}

/**
 * Get presentation settings for a specific variant.
 * Theme name is automatically derived from the presentation key.
 *
 * @param {string} key - Presentation variant key (e.g., 'standard', 'modal', 'simplified', 'spotlight')
 * @returns {{ theme: string, layout: object }} - Presentation settings with theme and layout
 */
export function getPresentationSettings(key) {
  const preset = presentations[key] ?? {};

  return {
    theme: key, // Theme name matches presentation key
    layout: mergeLayout(preset),
  };
}

/**
 * Merge component props with presentation config, giving priority to explicit props.
 * Useful for components that accept layout props but should fall back to presentation defaults.
 *
 * @param {object} props - Component props that may include formWidth, labelPosition, labelWidthPercent
 * @param {string} presentationKey - Presentation variant key to use as defaults
 * @returns {object} - Merged layout properties
 */
export function mergeLayoutProps(props, presentationKey) {
  const presentation = getPresentationSettings(presentationKey);

  return {
    formWidth: props.formWidth ?? presentation.layout.formWidth,
    labelPosition: props.labelPosition ?? presentation.layout.labelPosition,
    labelWidthPercent: props.labelWidthPercent ?? presentation.layout.labelWidthPercent,
    theme: props.theme ?? presentation.theme,
  };
}
