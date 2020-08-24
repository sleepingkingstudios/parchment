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

const MarkdownText = (props) => {
  const {
    className,
    text,
  } = props;
  let buffer;

  buffer = striptags(text);
  buffer = processMarkdown(buffer);
  buffer = parseHtml(buffer);

  return (
    <div className={addClassName('markdown-text', className)}>
      { buffer }
    </div>
  );
};

MarkdownText.defaultProps = {
  className: null,
};

MarkdownText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default MarkdownText;
