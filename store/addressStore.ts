import { create } from 'zustand'

interface AddressState {
  zipCode: string
  address: string
  setAddress: (address: string) => void
  setZipCode: (zip: string) => void
}

export const useAddressStore = create<AddressState>((set) => ({
  zipCode: '',
  address: '',
  setAddress: (address) => set({ address }),
  setZipCode: (zipCode) => set({ zipCode }),
}))
