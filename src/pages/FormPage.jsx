import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Form0Form from '../components/Form0Form';
import FormModal from '../components/FormModal';
import FormSpotlight from '../components/FormSpotlight';
import form0Config from '../../form0.config.js';
import {
  getFormById,
  PAGE_VARIANTS,
  OVERLAY_VARIANTS,
  DEFAULT_OVERLAY_VARIANT,
} from '../forms/registry.js';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  const formDefinition = getFormById(formId);
  const { schema, loading, error } = useFormSchema(formDefinition?.id);

  const overlayVariants = useMemo(() => new Set(OVERLAY_VARIANTS), []);
  const pageVariants = useMemo(() => new Set(PAGE_VARIANTS), []);

  const isPageVariant = variant ? pageVariants.has(variant) : false;
  const isOverlayRoute = !variant || overlayVariants.has(variant);
  const resolvedOverlayVariant = !isOverlayRoute
    ? null
    : overlayVariants.has(variant)
      ? variant
      : DEFAULT_OVERLAY_VARIANT;

  const pageVariantKey = isPageVariant ? variant : PAGE_VARIANTS[0];
  const pagePresentation = getPresentationSettings(pageVariantKey ?? 'standard', {
    fallbackTheme: pageVariantKey ?? 'standard',
  });
  const modalPresentation = getPresentationSettings('modal', { fallbackTheme: 'standard' });
  const spotlightPresentation = getPresentationSettings('spotlight', { fallbackTheme: 'standard' });

  const fallbackContainerStyle = {
    ...baseContainerStyle,
    maxWidth: form0Config.layout.formWidth,
  };

  const pageContainerStyle = {
    ...baseContainerStyle,
    maxWidth: pagePresentation.layout.formWidth,
  };

  useEffect(() => {
    if (!isOverlayRoute) {
      setModalOpen(false);
      setSpotlightOpen(false);
      return;
    }

    if (resolvedOverlayVariant === 'spotlight') {
      setSpotlightOpen(true);
      setModalOpen(false);
    } else {
      setModalOpen(true);
      setSpotlightOpen(false);
    }
  }, [formId, isOverlayRoute, resolvedOverlayVariant]);

  useEffect(() => {
    if (!(modalOpen || spotlightOpen)) {
      return;
    }

    if (typeof document === 'undefined') {
      return;
    }

    const active = document.activeElement;
    if (active && 'blur' in active && typeof active.blur === 'function') {
      active.blur();
    }
  }, [modalOpen, spotlightOpen]);

  if (!formDefinition) {
    return (
      <div style={{ ...fallbackContainerStyle, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Form "{formId}" was not found.</p>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </div>
    );
  }

  if (variant && !isPageVariant && !overlayVariants.has(variant)) {
    return (
      <div style={{ ...fallbackContainerStyle, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>
          Variant "{variant}" is not supported. Available variants: {[
            ...PAGE_VARIANTS,
            ...OVERLAY_VARIANTS,
          ].join(', ')}
        </p>
        <Button onClick={() => navigate(`/${formId}`)}>Go to default view</Button>
      </div>
    );
  }

  const sharedHeading = (
    <header style={{ marginBottom: 24 }}>
      <Button variant="ghost" onClick={() => navigate('/')}>
        ← All forms
      </Button>
      <h1 style={{ marginTop: 16 }}>{formDefinition.title}</h1>
      <p style={{ color: '#666' }}>{formDefinition.description}</p>
    </header>
  );

  if (isPageVariant) {
    return (
      <div style={pageContainerStyle}>
        {sharedHeading}
        {loading && !schema && <p>Loading schema…</p>}
        {error && (
          <p style={{ color: 'tomato' }}>
            Failed to load schema. Check the console for details.
          </p>
        )}
        {schema && (
          <Form0Form
            schema={schema}
            theme={pagePresentation.theme}
            formWidth={pagePresentation.layout.formWidth}
            labelWidthPercent={pagePresentation.layout.labelWidthPercent}
            labelPosition={pagePresentation.layout.labelPosition}
            simplifiedMode={variant === 'simplified'}
            onSimplifiedNavigation={(navigation) => {
              console.log('Simplified navigation:', navigation);
            }}
          />
        )}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
          {PAGE_VARIANTS.filter((pageVariant) => pageVariant !== variant).map((pageVariant) => (
            <Button
              key={`${formId}-${pageVariant}`}
              variant="secondary"
              onClick={() => navigate(`/${formId}/${pageVariant}`)}
            >
              {pageVariant === 'standard' ? 'Open standard page' : 'Open simplified page'}
            </Button>
          ))}
          <Button variant="default" onClick={() => navigate(`/${formId}`)}>
            Open modal
          </Button>
          <Button variant="default" onClick={() => navigate(`/${formId}/spotlight`)}>
            Open spotlight
          </Button>
        </div>
      </div>
    );
  }

  const overlayPresentation =
    resolvedOverlayVariant === 'spotlight' ? spotlightPresentation : modalPresentation;
  const OverlayComponent = resolvedOverlayVariant === 'spotlight' ? FormSpotlight : FormModal;
  const overlayOpen = resolvedOverlayVariant === 'spotlight' ? spotlightOpen : modalOpen;
  const setOverlayOpen = resolvedOverlayVariant === 'spotlight' ? setSpotlightOpen : setModalOpen;

  return (
    <>
      <OverlayComponent
        open={overlayOpen}
        onOpenChange={(nextOpen) => {
          setOverlayOpen(nextOpen);
          if (!nextOpen) {
            navigate('/');
          }
        }}
        schema={schema}
        formTitle={formDefinition.title}
        theme={overlayPresentation.theme}
        formWidth={overlayPresentation.layout.formWidth}
        labelWidthPercent={overlayPresentation.layout.labelWidthPercent}
        labelPosition={overlayPresentation.layout.labelPosition}
      />
      {error && (
        <p style={{ color: 'tomato', textAlign: 'center', marginTop: 16 }}>
          Failed to load schema. Check the console for details.
        </p>
      )}
    </>
  );
}

