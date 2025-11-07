import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { listForms, PAGE_VARIANTS } from '../forms/registry.js';
import { useFormSchema } from '../forms/use-form-schema.js';
import FormModal from '../components/FormModal.jsx';
import FormSpotlight from '../components/FormSpotlight.jsx';
import { getPresentationSettings } from '../lib/presentation-settings.js';

export default function Home() {
  const navigate = useNavigate();
  const forms = listForms();
  const [modalState, setModalState] = useState({ formId: null, open: false });
  const [spotlightState, setSpotlightState] = useState({ formId: null, open: false });

  // Load schema for the currently open overlay
  const activeFormId = modalState.open ? modalState.formId : spotlightState.formId;
  const { schema: overlaySchema } = useFormSchema(activeFormId);

  // Get presentation settings for overlays
  const modalPresentation = getPresentationSettings('modal');
  const spotlightPresentation = getPresentationSettings('spotlight');

  // Find form definition for overlay title
  const activeForm = forms.find((f) => f.id === activeFormId);

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 960,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <header style={{ textAlign: 'center' }}>
            <h1>Available Forms</h1>
            <p style={{ color: '#666' }}>
              Pick a form and choose how you want to render it. Page views navigate to dedicated
              routes, while overlays appear directly on this page.
            </p>
          </header>
          {forms.map((form) => (
            <section
              key={form.id}
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 12,
                padding: 24,
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              <h2 style={{ marginBottom: 8 }}>{form.title}</h2>
              <p style={{ marginBottom: 16, color: '#555' }}>{form.description}</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 12,
                }}
              >
                {PAGE_VARIANTS.map((variant) => (
                  <Button
                    key={`${form.id}-${variant}`}
                    variant="default"
                    onClick={() => navigate(`/${form.id}/${variant}`)}
                  >
                    {variant === 'standard' ? 'Standard Page' : 'Simplified Page'}
                  </Button>
                ))}
                <Button
                  variant="secondary"
                  onClick={() => setModalState({ formId: form.id, open: true })}
                >
                  Modal Overlay
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSpotlightState({ formId: form.id, open: true })}
                >
                  Spotlight Overlay
                </Button>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Modal Overlay - conditionally rendered to avoid Dialog interference */}
      {modalState.open && (
        <FormModal
          open={modalState.open}
          onOpenChange={(open) => setModalState({ formId: null, open })}
          schema={overlaySchema}
          formTitle={activeForm?.title || 'Form'}
          theme={modalPresentation.theme}
          formWidth={modalPresentation.layout.formWidth}
          labelWidthPercent={modalPresentation.layout.labelWidthPercent}
          labelPosition={modalPresentation.layout.labelPosition}
        />
      )}

      {/* Spotlight Overlay */}
      {spotlightState.open && (
        <FormSpotlight
          open={spotlightState.open}
          onOpenChange={(open) => setSpotlightState({ formId: null, open })}
          schema={overlaySchema}
          formTitle={activeForm?.title || 'Form'}
          theme={spotlightPresentation.theme}
          formWidth={spotlightPresentation.layout.formWidth}
          labelWidthPercent={spotlightPresentation.layout.labelWidthPercent}
          labelPosition={spotlightPresentation.layout.labelPosition}
        />
      )}
    </>
  );
}
