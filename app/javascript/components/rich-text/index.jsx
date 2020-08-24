import React, { useState } from 'react';
import PropTypes from 'prop-types';
import striptags from 'striptags';

import MarkdownText from '../markdown-text';
import PlainText from '../plain-text';
import { useLiquid } from './liquid/hooks';
import { addClassName } from '../../utils/react';

const renderContent = ({ markdown, text }) => {
  if (markdown) { return (<MarkdownText text={text} />); }

  return (<PlainText text={text} />);
};

const RichText = (props) => {
  const {
    className,
    liquid,
    markdown,
    text,
  } = props;
  const safeText = striptags(text);

  if (safeText.length === 0) { return null; }

  const [content, updateContent] = useState(
    liquid ? 'Loading...' : safeText,
  );

  if (liquid) { useLiquid({ callback: updateContent, template: safeText }); }

  return (
    <div className={addClassName('rich-text', className)}>
      { renderContent({ markdown, text: content }) }
    </div>
  );
};

RichText.defaultProps = {
  className: null,
  liquid: true,
  markdown: true,
};

RichText.propTypes = {
  className: PropTypes.string,
  liquid: PropTypes.bool,
  markdown: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default RichText;
