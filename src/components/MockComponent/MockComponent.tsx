import React, { FC } from 'react';
import './MockComponent.css';

interface MockComponentProps {}

const MockComponent: FC<MockComponentProps> = () => (
  <div className="MockComponent" data-testid="MockComponent">
      MockComponent Running!!!
  </div>
);

export default MockComponent;
