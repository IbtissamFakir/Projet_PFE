import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TableauNotes from './AdminNotes/TableauNotes'
import RelevePdf from './RelevePdf'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TableauNotes/>
  </StrictMode>
)
