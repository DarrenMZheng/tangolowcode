import { extendTheme } from 'coral-system';

export const theme = extendTheme({
  colors: {
    primary: {
      10: '#e8f3ff',
      20: '#bedaff',
      30: '#94bfff',
      40: '#6aa1ff',
      50: '#4080ff',
      60: '#165dff',
      70: '#0e42d2',
    },
    line: {
      normal: '#e5e6eb',
    },
    background: {
      normal: '#f3f3f4',
      secondary: '#e5e6eb',
    },
    text: {
      title: '#1d2129',
      body: '#4e5969',
      note: '#86909c',
      placeholder: '#c9cdd4',
    },
    custom: {
      topNavBg: '#222',
      topNavColor: '#fff',
      toolbarButtonBg: 'rgba(223, 223, 223, 0.08)',
      toolbarButtonBgHover: '#4080ff',
      toolbarButtonTextColor: '#f5f5f5',
      toolbarButtonTextColorHover: '#FFF',
      toolbarButtonTextColorDisabled: '#bfbfbf',
      sidebarBg: '#fff',
      sidebarExpandBg: '#fff',
      sidebarItemActiveBg: '#f2f3f5',
      sidebarItemHoverBg: '#f2f3f5',
      viewportBg: '#f0f2f5',
    },
  },
  radii: {
    s: '2px',
    m: '2px',
    l: '4px',
    xl: '8px',
    xxl: '16px',
  },
});
