export const PRIMARY_EMAIL = 'pratikbhusal12345@gmail.com';

const MOBILE_EMAIL_CLIENT_PATTERN = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const isMobileBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  return MOBILE_EMAIL_CLIENT_PATTERN.test(navigator.userAgent || '');
};

export const getMailtoHref = (email = PRIMARY_EMAIL) => `mailto:${email}`;

export const getGmailComposeHref = (email = PRIMARY_EMAIL) => {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

export const getPreferredEmailHref = (email = PRIMARY_EMAIL) =>
  isMobileBrowser() ? getMailtoHref(email) : getGmailComposeHref(email);

export const openPreferredEmail = (email = PRIMARY_EMAIL) => {
  if (typeof window === 'undefined') return;

  const nextHref = getPreferredEmailHref(email);
  if (isMobileBrowser()) {
    window.location.href = nextHref;
    return;
  }

  window.open(nextHref, '_blank', 'noopener,noreferrer');
};
