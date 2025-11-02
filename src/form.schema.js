export default {
  form: {
    name: 'MyForm',
    description: 'This is a test description',
    elements: [
      {
        type: 'Section',
        data_name: 'personal_info',
        label: 'Personal Info',
        display: 'inline', //Section can be 'inline' or 'drilldown'
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null,'default' or 'subtext'
        visible: true,
        visible_conditions: null,
        elements: [
          {
            type: 'TextField',
            data_name: 'first_name',
            label: 'First Name',
            display: 'default', //TextField can only be 'default'
            description: 'This is a test description', //description can be null or a string
            description_mode: 'subtext', //description_mode can be null, 'default' or 'subtext'
            required: true,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            pattern: '^[a-zA-Z]+$',
            pattern_description:
              'One or more letters (uppercase or lowercase), with no spaces, numbers, or symbols',
            supporting_image: false, //supporting_image can be true or false
            supporting_image_path: null, //supporting_image_path can be null or a string
            supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
          },
          {
            type: 'NumericField',
            data_name: 'age',
            label: 'Age',
            display: 'default', //NumericField can only be 'default'
            description: null, //description can be null or a string
            description_mode: null, //description_mode can be null, 'default' or 'subtext'
            required: true,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            min: 16,
            max: 100,
            format: 'integer', //NumericField can be 'integer' or 'float'
            supporting_image: false, //supporting_image can be true or false
            supporting_image_path: null, //supporting_image_path can be null or a string
            supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
          },
          {
            type: 'SingleChoiceField',
            data_name: 'favorite_color',
            label: 'Favorite Color',
            display: 'default',
            description: 'Pick the color you like the most.',
            description_mode: 'default',
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            allow_other: true,
            choices: [
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
              { value: 'green', label: 'Green' },
            ],
            supporting_image: true,
            supporting_image_path: 'palette.jpg',
            supporting_image_display: 'dialog',
            is_searchable: false,
            is_searchable_mode: null,
          },
          {
            type: 'SingleChoiceField',
            data_name: 'contact_method',
            label: 'Preferred Contact Method',
            display: 'radio',
            description: 'We will use this channel for follow ups.',
            description_mode: 'subtext',
            required: true,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            allow_other: false,
            choices: [
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
            ],
            supporting_image: false,
            supporting_image_path: null,
            supporting_image_display: null,
            is_searchable: false,
            is_searchable_mode: null,
          },
          {
            type: 'BooleanField',
            data_name: 'newsletter_opt_in',
            label: 'Subscribe to newsletter?',
            display: 'default',
            description: 'Receive occasional updates and product news.',
            description_mode: 'default',
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            choices: [
              { value: 'yes', label: 'Yes, sign me up' },
              { value: 'no', label: 'No thanks' },
            ],
            third_option_enabled: false,
            supporting_image: false,
            supporting_image_path: null,
            supporting_image_display: null,
          },
          {
            type: 'MultiChoiceField',
            data_name: 'interests',
            label: 'What topics interest you?',
            display: 'default',
            description: 'Select all subjects you would like to hear about.',
            description_mode: 'default',
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: [],
            allow_other: true,
            choices: [
              { value: 'technology', label: 'Technology' },
              { value: 'design', label: 'Design' },
              { value: 'finance', label: 'Finance' },
              { value: 'marketing', label: 'Marketing' },
            ],
            supporting_image: true,
            supporting_image_path: 'topics.jpg',
            supporting_image_display: 'default',
            is_searchable: false,
            is_searchable_mode: null,
          },
          {
            type: 'MultiChoiceField',
            data_name: 'available_days',
            label: 'Available Days',
            display: 'checkbox',
            description: null,
            description_mode: null,
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: [],
            allow_other: false,
            choices: [
              { value: 'mon', label: 'Monday' },
              { value: 'wed', label: 'Wednesday' },
              { value: 'fri', label: 'Friday' },
            ],
            supporting_image: false,
            supporting_image_path: null,
            supporting_image_display: null,
            is_searchable: false,
            is_searchable_mode: null,
          },
          {
            type: 'DateField',
            data_name: 'contact_date',
            label: 'Preferred Contact Date',
            display: 'default',
            description: null,
            description_mode: null,
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: 'now',
          },
          {
            type: 'TimeField',
            data_name: 'contact_time',
            label: 'Preferred Contact Time',
            display: 'default',
            description: null,
            description_mode: null,
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: 'now',
          },
        ]
      },
      {
        type: 'CalculatedField',
        data_name: 'can_vote',
        label: 'Eligible',
        display: {
          style: 'text', // or numeric, date, currency
        },
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null, 'default' or 'subtext'
        required: false, //CalcualtedField is always required = false
        visible: true,
        visible_conditions: null,
        read_only: true, //CalcualtedField is always read_only = true
        calculate: 'IF($age >= 18, "yes", "no")',
        supporting_image: false, //supporting_image can be true or false
        supporting_image_path: null, //supporting_image_path can be null or a string
        supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
      },
      {
        type: 'CalculatedField',
        data_name: 'calc_test',
        label: 'calc_test',
        display: {
          style: 'text', // or numeric, date, currency
        },
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null, 'default' or 'subtext'
        required: false, //CalcualtedField is always required = false
        visible: true,
        visible_conditions: null,
        read_only: true, //CalcualtedField is always read_only = true
        calculate: 'SETRESULT($age + 10 >= 30 ? true : false)',
        supporting_image: false, //supporting_image can be true or false
        supporting_image_path: null, //supporting_image_path can be null or a string
        supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
      },
      {
        type: 'CalculatedField',
        data_name: 'calc_test_new',
        label: 'calc_test_new',
        display: {
          style: 'text', // or numeric, date, currency
        },
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null, 'default' or 'subtext'
        required: false, //CalcualtedField is always required = false
        visible: true,
        visible_conditions: null,
        read_only: true, //CalcualtedField is always read_only = true
        calculate: '$age + 88',
        supporting_image: false, //supporting_image can be true or false
        supporting_image_path: null, //supporting_image_path can be null or a string
        supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
      },
      {
        type: 'LabelField',
        data_name: 'photo_consent',
        label: 'Please be aware that photographs may be taken at this Community Engagement event. By submitting this form, you consent to the use of any photos in which you appear in reports related to the Housing Improvement under PDUNM project and in Build Change marketing materials. You also acknowledge that the information you provide on this form will only be used for the purposes of this project.',
        display: 'default',
        description: null,
        description_mode: null,
        required: false,
        visible: true,
        visible_conditions: null,
        read_only: true,
        default_value: null,
        supporting_image: false,
        supporting_image_path: null,
        supporting_image_display: null,
      },
      {
        type: 'Section',
        data_name: 'section_drill',
        label: 'Drilldown section test',
        display: 'drilldown', //Section can be 'inline' or 'drilldown'
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null, 'default' or 'subtext'
        visible: true,
        visible_conditions: null,
        elements: [
          {
            type: 'TextField',
            data_name: 'comments',
            label: 'Comments',
            display: 'default', //TextField can only be 'default'
            description: null, //description can be null or a string
            description_mode: null, //description_mode can be null, 'default' or 'subtext' 
            required: false,
            required_conditions: null,
            visible: true,
            visible_conditions: null,
            read_only: false,
            read_only_conditions: null,
            default_value: null,
            pattern: null,
            pattern_description: null,
            supporting_image: false, //supporting_image can be true or false
            supporting_image_path: null, //supporting_image_path can be null or a string
            supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
          },
          ]
      },
      {
        type: 'TextField',
        data_name: 'who_voted',
        label: 'Who voted?',
        display: 'default', //TextField can only be 'default'
        description: null, //description can be null or a string
        description_mode: null, //description_mode can be null, 'default' or 'subtext'
        required: true,
        required_conditions: null,
        visible: false,
        visible_conditions: {
          and: [
            { field_id: 'can_vote', operator: 'equal_to', value: 'yes' },
            {
              or: [
                { field_id: 'age', operator: 'greater_than', value: 20 },
                { field_id: 'first_name', operator: 'equal_to', value: 'Bob' },
              ],
            },
          ],
        },
        read_only: true,
        read_only_conditions: null,
        default_value: null,
        pattern: null,
        pattern_description: null,
        supporting_image: false, //supporting_image can be true or false
        supporting_image_path: null, //supporting_image_path can be null or a string
        supporting_image_display: null, //supporting_image_display can be 'default', 'dialog' or null
      },
    ]
  }
};
