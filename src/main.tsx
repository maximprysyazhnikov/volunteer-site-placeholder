import { createRoot } from 'react-dom/client'
import './index.scss'
import './i18n.ts';
import { Root } from './Root.tsx';

createRoot(document.getElementById('root')!).render(<Root/>)
