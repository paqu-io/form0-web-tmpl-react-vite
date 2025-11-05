/**
 * form0 Configuration File
 *
 * This is the central configuration for all form0-related settings in your app.
 * Settings defined here are used as defaults throughout the application.
 *
 * Note: This config format is designed to be compatible with form0-cli for future
 * integration, though some settings (like theme.mode) are browser-specific.
 */

export default {
  /**
   * Layout Configuration
   *
   * Controls how form fields are laid out and sized.
   * These settings are applied via CSS custom properties and can be overridden
   * per-component (e.g., in modals or drawers).
   */
  layout: {
    /**
     * Position of field labels relative to inputs
     * @type {'side' | 'top'}
     * - 'side': Labels appear to the left of inputs (horizontal layout)
     * - 'top': Labels appear above inputs (vertical layout)
     */
    labelPosition: 'side',

    /**
     * Width percentage for labels when labelPosition is 'side'
     * @type {number}
     * Range: 0-100, recommended 20-40
     * When labels are on the side, this determines how much horizontal space
     * they occupy. The remaining space is used for the input field.
     */
    labelWidthPercent: 30,

    /**
     * Default width for form containers
     * @type {string}
     * Can be any valid CSS width value (px, %, vw, rem, etc.)
     */
    formWidth: '70vw',
  },

  /**
   * Theme Configuration
   *
   * Controls the visual appearance of form0 forms.
   */
  theme: {
    /**
     * Color mode for the form
     * @type {'light' | 'dark' | 'system'}
     * - 'light': Always use light theme
     * - 'dark': Always use dark theme
     * - 'system': Follow system preference (requires implementation)
     */
    mode: 'light',

    /**
     * Path to custom vanilla-extract theme file
     * @type {string | null}
     * When null, form0-react's default theme is used.
     * When set, import and use a custom theme object created with vanilla-extract.
     *
     * Example: './src/themes/custom-example.css.js'
     *
     * See src/themes/custom-example.css.js for how to create custom themes.
     */
    customTheme: null,
  },

  /**
   * Schema Management
   *
   * Configures where form schemas are stored and how they're loaded.
   */
  schemas: {
    /**
     * Directory where form schema files are located
     * @type {string}
     * Relative to project root. Used by tooling and routing logic.
     */
    directory: './src',
  },

  /**
   * Field Renderer Overrides
   *
   * Map field types to custom renderer implementations.
   * form0-react provides basic renderers for all field types, but you can
   * override them with custom implementations (e.g., using shadcn components).
   *
   * Keys are field type names from form0-core (e.g., 'DateField', 'TextField').
   * Values are renderer identifiers that map to components in src/field-renderers/resolver.js
   *
   * Add more entries here as you create custom renderers.
   */
  fieldRenderers: {
    DateField: 'date-field-shadcn',
    // TextField: 'text-field-custom',
    // NumericField: 'numeric-field-custom',
    // etc.
  },

  /**
   * Output Format
   *
   * Controls how form data is serialized on submission.
   * This setting matches form0-cli behavior.
   */
  output: {
    /**
     * Use schema keys instead of data_name values in output
     * @type {boolean}
     * - false: Use field data_name values (default, human-readable)
     * - true: Use generated or explicit key values
     *
     * CLI-compatible setting.
     */
    useKeys: false,
  },

  /**
   * Future: BuildingPlan Settings
   *
   * Controls reform-specific BuildingPlanSection features.
   * These settings are placeholders for future functionality.
   */
  buildingPlan: {
    /**
     * Show element labels in BuildingPlanSection fields
     * @type {boolean}
     * Requires reform subscription. Not yet implemented in form0-react.
     */
    showElementLabels: false,
  },
};

