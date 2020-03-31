import { valueOrDefault } from './object';
import { safeCapitalize } from './string';

export const extractInjectedComponent = (component) => {
  const injected = component.shallow().find('ComponentWithInjectedProps');

  return injected.exists() ? injected : component;
};

export const toHaveFormControl = expect => (received, expectedControl, withProps) => {
  const formControl = received.find(expectedControl);
  const expectedProps = valueOrDefault(withProps, {});

  expect(formControl).toExist();
  expect(formControl).toHaveProp(expectedProps);

  return { pass: true, message: () => '' };
};

export const toHaveFormGroup = expect => (received, expectedGroup, fn) => {
  const formGroup = received.find(expectedGroup);

  expect(formGroup).toExist();

  fn(extractInjectedComponent(formGroup).shallow());

  return { pass: true, message: () => '' };
};

export const toHaveFormInput = expect => (received, props) => {
  const {
    form,
    inputType,
    prop,
  } = props;

  expect(received).toHaveProp({ prop });

  const formInput = received.find(`${safeCapitalize(prop)}Input`);

  expect(formInput).toExist();
  expect(formInput).toHaveProp({ form });

  const shallowInput = formInput.shallow();

  expect(shallowInput).toExist();
  expect(shallowInput).toHaveDisplayName(valueOrDefault(inputType, 'FormInput'));

  return { pass: true, message: () => '' };
};
