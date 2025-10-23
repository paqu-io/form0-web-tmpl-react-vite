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
            description: null, //description can be null or a string
            description_mode: null, //description_mode can be null, 'default' or 'subtext'
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