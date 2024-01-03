import { create } from 'zustand'

type categoryFormState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useCategoryForm = create<categoryFormState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
