import React from 'react';
import PropTypes from 'prop-types';

import { addClassName } from '../../utils/react';

const formatParagraph = (paragraph) => {
  const lines = paragraph.split('\n');
  const elements = [];

  lines.forEach((line, index) => {
    /* eslint-disable-next-line react/no-array-index-key */
    if (index !== 0) { elements.push(<br key={index} />); }

    elements.push(line);
  });

  return elements;
};

const formatText = (text) => {
  const paragraphs = text.split(/\n{2,}/);

  return paragraphs.map((paragraph, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <p key={`paragraph-${index}`}>{ formatParagraph(paragraph) }</p>
  ));
};

const PlainText = ({ className, text }) => (
  <div className={addClassName('plain-text', className)}>
    { formatText(text) }
  </div>
);

PlainText.defaultProps = {
  className: '',
};

PlainText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default PlainText;
