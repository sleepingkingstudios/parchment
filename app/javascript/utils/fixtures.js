/* eslint-disable-next-line import/prefer-default-export */
export const trimMultilineLiteral = (text) => {
  if (!text) { return ''; }

  const paragraphs = text.split('\n\n');

  return paragraphs
    .map((paragraph) => {
      const lines = paragraph.split('\n');

      return lines.map(line => line.trim()).join(' ');
    })
    .join('\n\n');
};
