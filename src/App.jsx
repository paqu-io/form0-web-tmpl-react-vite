// import { useRef } from 'react';
// import { FormRenderer } from 'form0-react';
// import schema from './form.schema.js';
// import { myCustomTheme } from './custom-theme.css.js';

// function App() {
//   const didLogSchema = useRef(false);

//   return (
//     <div style={{ maxWidth: 600, margin: '2rem auto' }}>
//       <FormRenderer
//         schema={schema}
//         debug
//         initialValues={{ age: 18 }}
//         onSubmit={(vals) => alert(JSON.stringify(vals, null, 2))}
//         onSchemaReady={(schemaWithKeys) => {
//           if (!didLogSchema.current) {
//             console.log(schemaWithKeys);
//             didLogSchema.current = true;
//           }
//         }}
//         theme="standard" // or "modal", "simplified"
//         //theme={myCustomTheme} // Custom theme
//         colorMode="dark" // or "light", or "system" (with system detection logic)
//       />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:formId" element={<FormPage />} />
        <Route path="/:formId/:variant" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
