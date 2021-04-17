import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Page from '../components/page';

const HomePage = props => (
  <Page {...props}>
    <h1>Game Reference</h1>

    <ul>
      <li>
        <Link className="spells-link" to="/spells">Spells</Link>
      </li>
    </ul>

    <h2>Reference</h2>

    <ul>
      <li>
        <Link className="items-link" to="/reference/items">Items</Link>

        <ul>
          <li>
            <Link className="magic-items-link" to="/reference/items/magic-items">Magic Items</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link className="languages-link" to="/reference/languages">Languages</Link>
      </li>
      <li>
        <Link className="skills-link" to="/reference/skills">Skills</Link>
      </li>
    </ul>

    <h2>Mechanics</h2>

    <ul>
      <li>
        <Link className="actions-link" to="/mechanics/actions">Actions</Link>
      </li>
      <li>
        <Link className="conditions-link" to="/mechanics/conditions">Conditions</Link>
      </li>
    </ul>

    <h2>Sources</h2>

    <ul>
      <li>
        <Link className="books-link" to="/books">Books</Link>
      </li>
    </ul>
  </Page>
);

HomePage.defaultProps = {
  children: null,
  className: null,
  layout: null,
  subtitle: '5e Campaign Companion',
  title: 'Parchment',
};

HomePage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default HomePage;
