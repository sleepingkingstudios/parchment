import React from 'react';
import PropTypes from 'prop-types';
import {
  HtmlRenderer,
  Parser as CommonmarkParser,
} from 'commonmark';
import { Parser as HtmlParser } from 'html-to-react';
import striptags from 'striptags';

import { addClassName } from '../../utils/react';

const parseHtml = markdown => new HtmlParser().parse(markdown);

const processMarkdown = (raw) => {
  const stripped = striptags(raw);
  const parser = new CommonmarkParser();
  const parsed = parser.parse(stripped);
  const renderer = new HtmlRenderer({ safe: true });
  const rendered = renderer.render(parsed);

  return rendered.trim();
};

const RichText = (props) => {
  const {
    className,
    markdown,
    text,
  } = props;
  let buffer = striptags(text);

  if (markdown) {
    buffer = processMarkdown(buffer);
  } else if (buffer.length > 0) {
    buffer = `<p>${buffer}</p>`;
  }

  return (
    <div className={addClassName('rich-text', className)}>
      { parseHtml(buffer) }
    </div>
  );
};

RichText.defaultProps = {
  className: null,
  markdown: true,
};

RichText.propTypes = {
  className: PropTypes.string,
  markdown: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default RichText;
