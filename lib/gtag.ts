// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-WNE2V5QXER'

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Example usage:
// event('click', 'button', 'header-cta')
// event('download', 'file', 'chess-board-image')
// pageview('/board')
