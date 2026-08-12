/**
 * Utility to convert raw Markdown strings into proper HTML
 * Fixes raw markdown syntax (##, ---, 1., *, >) showing as literal text
 */

export function isRawMarkdown(text) {
  if (!text || typeof text !== 'string') return false;
  // Check if string contains raw Markdown indicators
  return (
    /^#+\s/m.test(text) ||
    /^\s*(---|___|\*\*\*)\s*$/m.test(text) ||
    /^\s*\d+\.\s/m.test(text) ||
    /^\s*[\*\+-]\s/m.test(text) ||
    /^\s*>\s/m.test(text) ||
    /<p>\s*(##|###|####|---|1\.|-|\*)\s+/m.test(text)
  );
}

export function convertMarkdownToHtml(markdown) {
  if (!markdown || typeof markdown !== 'string') return '';
  
  let src = markdown;

  // Strip wrapping <p> if raw markdown is inside single paragraph
  if (src.startsWith('<p>') && src.endsWith('</p>')) {
    src = src.slice(3, -4).trim();
  }

  // Normalize break tags
  src = src.replace(/<br\s*\/?>/gi, '\n');

  const lines = src.split('\n');
  const result = [];
  let inList = false;
  let listType = null;
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      continue;
    }

    // Horizontal Rule
    if (/^(---|___|\*\*\*)$/.test(line)) {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      result.push('<hr />');
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      const level = headingMatch[1].length;
      const content = parseInlineMarkdown(headingMatch[2]);
      result.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    // Blockquote
    const quoteMatch = line.match(/^>\s*(.*)$/);
    if (quoteMatch) {
      if (inList) { result.push(`</${listType}>`); inList = false; }
      if (!inBlockquote) { result.push('<blockquote>'); inBlockquote = true; }
      result.push(`<p>${parseInlineMarkdown(quoteMatch[1])}</p>`);
      continue;
    } else if (inBlockquote) {
      result.push('</blockquote>');
      inBlockquote = false;
    }

    // Bullet List
    const bulletMatch = line.match(/^[\*\+-]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push(`</${listType}>`);
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      result.push(`<li>${parseInlineMarkdown(bulletMatch[1])}</li>`);
      continue;
    }

    // Numbered List
    const numberMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push(`</${listType}>`);
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li>${parseInlineMarkdown(numberMatch[1])}</li>`);
      continue;
    }

    // Close list if line is not list item
    if (inList) {
      result.push(`</${listType}>`);
      inList = false;
    }

    // Regular paragraph
    result.push(`<p>${parseInlineMarkdown(line)}</p>`);
  }

  if (inList) result.push(`</${listType}>`);
  if (inBlockquote) result.push('</blockquote>');

  return result.join('');
}

function parseInlineMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
