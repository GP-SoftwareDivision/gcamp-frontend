'use client'

import { createPortal } from 'react-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface DropdownMenuProps {
  open?: boolean
  anchor?: 'bottom' | 'top'
  triggerRef: React.RefObject<HTMLElement | null>
  children: React.ReactNode
}

export function DropdownMenu({ children, open, anchor = 'bottom', triggerRef }: DropdownMenuProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const offset = -40
      const top =
        anchor === 'top'
          ? rect.top + window.scrollY - (menuRef.current?.offsetHeight ?? 0) - offset
          : rect.bottom + window.scrollY + offset

      const left = rect.right + window.scrollX

      setPosition({ top, left })
    }
  }, [open, anchor, triggerRef])

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 9999,
        minWidth: '8rem',
      }}
      className={clsx(' shadow-lg bg-white border border-gray-200 py-1 rounded-2xl')}
    >
      {children}
    </div>,
    document.body
  )
}
