import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSelector } from './LanguageSelector'
import { describe, expect, it, vi } from 'vitest'
import { JSX, ReactNode } from 'react'

type NavigationModule = {
  usePathname: () => string
  Link: (props: { href: string; locale?: string; children: ReactNode }) => JSX.Element
}

// MOCK: usePathname
vi.mock('@/i18n/navigation', async () => {
  const actual = await vi.importActual<NavigationModule>('@/i18n/navigation')
  return {
    ...actual,
    usePathname: () => '/articles',
    Link: ({ href, children, locale }: { href: string; locale?: string; children: React.ReactNode }) => (
      <a href={`/${locale}${href}`}>{children}</a>
    ),
  }
})

describe('LanguageSelector', () => {
  it('renders language component and icon button', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens menu on click and shows all locales', async () => {
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
