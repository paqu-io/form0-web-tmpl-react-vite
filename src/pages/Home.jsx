import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { listForms, PAGE_VARIANTS, OVERLAY_VARIANTS } from '../forms/registry.js';

export default function Home() {
  const navigate = useNavigate();
  const forms = listForms();

  return (
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
            Pick a form and choose how you want to render it – each route maps to a single schema
            instance.
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
              {OVERLAY_VARIANTS.map((variant) => (
                <Button
                  key={`${form.id}-${variant}`}
                  variant="secondary"
                  onClick={() =>
                    navigate(variant === 'modal' ? `/${form.id}` : `/${form.id}/${variant}`)
                  }
                >
                  {variant === 'modal' ? 'Modal Overlay' : 'Spotlight Overlay'}
                </Button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
