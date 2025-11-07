import form0Config from '../../form0.config.js';

const baseLayout = form0Config.layout ?? {};
const presentations = form0Config.presentations ?? {};

function mergeLayout(overrides = {}) {
  return {
    formWidth: overrides.formWidth ?? baseLayout.formWidth,
    labelPosition: overrides.labelPosition ?? baseLayout.labelPosition,
    labelWidthPercent: overrides.labelWidthPercent ?? baseLayout.labelWidthPercent,
  };
}

export function getPresentationSettings(key, { fallbackTheme } = {}) {
  const preset = presentations[key] ?? {};
  const fallback = presentations.standard ?? {};

  return {
    theme: preset.theme ?? fallbackTheme ?? fallback.theme ?? key,
    layout: mergeLayout(preset.layout),
  };
}
