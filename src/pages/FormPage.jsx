import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Form0Form from '../components/Form0Form';
import form0Config from '../../form0.config.js';
import { getFormById, PAGE_VARIANTS, DEFAULT_PAGE_VARIANT_KEY } from '../forms/registry.js';
import { useFormSchema } from '../forms/use-form-schema.js';
import { getPresentationSettings } from '../lib/presentation-settings.js';

const baseContainerStyle = {
  width: '100%',
  margin: '2rem auto',
  padding: '0 1rem',
};

export default function FormPage() {
  const { formId, variant } = useParams();
  const navigate = useNavigate();

  const formDefinition = getFormById(formId);
  const { schema, loading, error } = useFormSchema(formDefinition?.id);

  // Default to standard variant if no variant specified
  const pageVariant = variant || DEFAULT_PAGE_VARIANT_KEY;
  const isValidVariant = PAGE_VARIANTS.includes(pageVariant);

  const pagePresentation = getPresentationSettings(pageVariant);

  const fallbackContainerStyle = {
    ...baseContainerStyle,
    maxWidth: form0Config.layout.formWidth,
  };

  const pageContainerStyle = {
    ...baseContainerStyle,
    maxWidth: pagePresentation.layout.formWidth,
  };

  // Handle form not found
  if (!formDefinition) {
    return (
      <div style={{ ...fallbackContainerStyle, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Form "{formId}" was not found.</p>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </div>
    );
  }

  // Handle invalid variant
  if (!isValidVariant) {
    return (
      <div style={{ ...fallbackContainerStyle, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>
          Variant "{pageVariant}" is not supported. Available page variants:{' '}
          {PAGE_VARIANTS.join(', ')}
        </p>
        <Button onClick={() => navigate(`/${formId}/${DEFAULT_PAGE_VARIANT_KEY}`)}>
          Go to default view
        </Button>
      </div>
    );
  }

  return (
    <div style={pageContainerStyle}>
      <header style={{ marginBottom: 24 }}>
        <Button variant="ghost" onClick={() => navigate('/')}>
          ← All forms
        </Button>
        <h1 style={{ marginTop: 16 }}>{formDefinition.title}</h1>
        <p style={{ color: '#666' }}>{formDefinition.description}</p>
      </header>

      {loading && !schema && <p>Loading schema…</p>}
      {error && (
        <p style={{ color: 'tomato' }}>Failed to load schema. Check the console for details.</p>
      )}

      {schema && (
        <Form0Form
          schema={schema}
          theme={pagePresentation.theme}
          formWidth={pagePresentation.layout.formWidth}
          labelWidthPercent={pagePresentation.layout.labelWidthPercent}
          labelPosition={pagePresentation.layout.labelPosition}
          simplifiedMode={pageVariant === 'simplified'}
          onSimplifiedNavigation={(navigation) => {
            console.log('Simplified navigation:', navigation);
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
        {PAGE_VARIANTS.filter((v) => v !== pageVariant).map((otherVariant) => (
          <Button
            key={`${formId}-${otherVariant}`}
            variant="default"
            onClick={() => navigate(`/${formId}/${otherVariant}`)}
          >
            Switch to {otherVariant.charAt(0).toUpperCase() + otherVariant.slice(1)} Page
          </Button>
        ))}
      </div>
    </div>
  );
}

