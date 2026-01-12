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

    /**
     * Presentation Variants
     *
     * Define layout overrides for different presentation contexts.
     * Each variant automatically uses a theme with the same name (e.g., 'standard' variant uses 'standard' theme).
     *
     * Available variants:
     * - Page variants: 'standard', 'simplified' (full-page dedicated views)
     * - Overlay variants: 'modal', 'spotlight' (overlay components that appear over other content)
     *
     * Any layout property not specified in a variant will fall back to the global defaults above.
     */
    presentations: {
      /**
       * Standard page variant
       * Full-featured form display with all fields and standard spacing.
       * Used for dedicated form pages with complete functionality.
       */
      standard: {
        formWidth: '70vw',
        labelPosition: 'side',
        labelWidthPercent: 30,
      },

      /**
       * Simplified page variant
       * One-question-at-a-time wizard-style form display.
       * Uses the 'simplified' theme with step-by-step navigation.
       * 
       * Note: In simplified mode, form0-react hardcodes labelPosition to 'top'
       * and labelWidthPercent to 100% for individual fields. Only formWidth
       * affects the layout in this mode.
       */
      simplified: {
        formWidth: '65vw',
      },

      /**
       * Modal overlay variant
       * Compact form display for modal dialogs.
       * Slightly wider labels to accommodate modal width constraints.
       */
      modal: {
        formWidth: '60vw',
        labelPosition: 'side',
        labelWidthPercent: 35,
      },

      /**
       * Spotlight (drawer) overlay variant
       * Form display for slide-in drawers from the side.
       * Narrower width optimized for drawer presentation.
       */
      spotlight: {
        formWidth: '55vw',
        labelPosition: 'side',
        labelWidthPercent: 35,
      },
    },
  },

  /**
   * Engine Configuration
   *
   * Controls how the form engine executes inside the browser.
   * - 'main-thread': run evaluations on the React/UI thread (current default)
   * - 'worker': offload engine evaluations to a Web Worker when supported
   */
  engine: {
    mode: 'worker',
    /**
     * Store strategy for React bindings
     * @type {'snapshot' | 'selector'}
     * - 'snapshot': clone full engine state into React state on each eval (current behavior)
     * - 'selector': use per-field subscriptions to reduce re-renders
     */
    store: 'snapshot', //DON'T USE 'selector' for now since validation messages show in Navigation Tree but not under each field form.
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
     * When set, the theme will be dynamically imported and applied to forms.
     *
     * Example: './src/themes/custom-example.css.js'
     *
     * The theme file should export a theme object created with vanilla-extract's
     * createTheme() function. See src/themes/custom-example.css.js for a complete example.
     *
     * Note: The path is relative to the src/components/ directory where Form0Form.jsx
     * resides, so use '../themes/...' from that perspective.
     */
    customTheme: null,
    // Uncomment to test the example custom theme:
    // customTheme: '../themes/custom-example.css.js',
  },

  /**
   * Interaction Behavior
   *
   * Controls how forms enter view/edit modes and how overlays respond to submissions.
   */
  interaction: {
    /**
     * Default interaction mode when loading a form.
     * @type {'edit' | 'view' | 'readonly'}
     * - 'edit': Start in Edit mode
     * - 'view' | 'readonly': Start in View mode
     */
    defaultMode: 'view',

    /**
     * Control whether primary actions (Submit / Save / Add) stay visible in View mode.
     * - true: show them disabled beside the Edit button (current behavior)
     * - false: hide them until Edit is clicked
     */
    showPrimaryActionsInViewMode: false,

    /**
     * Automatically close modal/drawer overlays after successful submit,
     * regardless of the initial interaction mode.
     */
    closeOverlayOnSubmit: true,
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
    directory: './src/forms',
  },

  /**
   * Development Server
   *
   * Configure the app dev server command and local API routing for form0-cli.
   */
  devServer: {
    /**
     * Command to start the app dev server (used by `form0 serve --app`)
     */
    command: 'npm run dev',

    /**
     * When true, submit records to the form0-cli dev server connector endpoints.
     */
    submitToConnector: true,

    /**
     * Base URL for form0-cli dev server API endpoints.
     * Use '/api' with Vite proxy, or a full URL for direct requests.
     */
    apiBaseUrl: '/api',
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

    /**
     * Override width for BuildingPlan repeatable modals (floors, rooms, columns, beams, objects, doors, windows).
     * Accepts any CSS width value (e.g., '85vw', '960px', '100%'). When unset, defaults to component width.
     */
    modalWidthOverride: '85vw',
  },

  connectors: {
    'form0-connector-pg': {
      tableName: 'form0_submissions',
      schema: 'public',
      enabled: true,
      autoLoad: true,
    },
    'form0-connector-sqlite': {
      tableName: 'form0_submissions',
      childTableName: 'form0_submissions_children',
      enabled: true,
      autoLoad: false,
    },
  },
};
