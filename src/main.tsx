import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from "./shared/contexts/AuthProvider.tsx";
import { ROUTES } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={ROUTES} />
        </AuthProvider>
    </StrictMode>,
)
