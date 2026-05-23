import { Modal } from '../common/Modal'
import { ContactFormFields } from './ContactFormFields'
import { useContactForm } from '../../hooks/useContactForm'
import { CheckCircle } from 'lucide-react'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { municipalities, loading, error, success, submit, setSuccess } =
    useContactForm(onClose)

  const handleClose = () => {
    setSuccess(false)
    onClose()
  }

  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="הפנייה נשלחה">
        <div className="text-center py-8">
          <CheckCircle className="w-14 h-14 text-brand-green mx-auto mb-4" />
          <p className="text-lg font-bold text-slate-900 mb-1">
            הפנייה שלך התקבלה בהצלחה!
          </p>
          <p className="text-slate-500 text-sm">נחזור אליך בהקדם.</p>
          <button
            onClick={handleClose}
            className="mt-6 px-6 py-2 bg-brand-cyan text-white rounded-xl hover:bg-brand-cyan-hover transition-all"
          >
            סגירה
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="טופס פנייה — גשרים לקהילה">
      <ContactFormFields
        municipalities={municipalities}
        onSubmit={submit}
        loading={loading}
        error={error}
      />
    </Modal>
  )
}
