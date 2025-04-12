import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSelector } from './LanguageSelector'
import { describe, expect, it, vi } from 'vitest'

// MOCK: usePathname
vi.mock('@/i18n/navigation', async () => {
  const actual = await vi.importActual<any>('@/i18n/navigation')
  return {
    ...actual,
    usePathname: () => '/articles',
    Link: ({ href, children, locale }: any) => (
      <a href={`/${locale}${href}`}>{children}</a>
    ),
  }
})

describe('LanguageSelector', () => {
  it('renderiza componente y boton', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('abre menu al hacer click y muestra los idiomas', async () => {
    render(<LanguageSelector />)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('DE')).toBeInTheDocument()

    expect(screen.getByText('EN').closest('a')).toHaveAttribute('href', '/en/articles')
    expect(screen.getByText('ES').closest('a')).toHaveAttribute('href', '/es/articles')
    expect(screen.getByText('DE').closest('a')).toHaveAttribute('href', '/de/articles')
  })
})
