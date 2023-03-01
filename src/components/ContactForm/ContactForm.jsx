import { useState } from 'react';

import { Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import {
  ErrMessage,
  FormWrap,
  FormInput,
  InputName,
  SubmitBtn,
} from 'components/ContactForm/ContactForm.styled';

const namePattern =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const numberPattern =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = object().shape({
  name: string()
    .max(20)
    .matches(namePattern, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.",
    })
    .required(),
  number: string()
    .min(3)
    .matches(numberPattern, {
      message:
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
    })
    .required(),
});

export default function ContactForm(onSubmit) {
  const [name, setName] = useState('2');
  const [number, setNumber] = useState('3');

  console.log(name);
  console.log(number);

  const handleSubmit = event => {
    console.log(event);
    console.log(event.target);
    console.log(event.name);
    console.log(event.number);

    const { name, number } = event;

    switch (event) {
      case 'name':
        setName(name);
        break;

      case 'number':
        setNumber(number);
        break;

      default:
        return;
    }

    // resetForm();
  };

  return (
    <Formik
      initialValues={{ name, number }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormWrap>
        <InputName>
          Name
          <FormInput autoComplete="off" type="text" name="name" />
        </InputName>

        <ErrMessage>
          <ErrorMessage name="name" />
        </ErrMessage>
        <InputName>
          Number
          <FormInput autoComplete="off" type="tel" name="number" />
        </InputName>

        <ErrMessage>
          <ErrorMessage name="number" component="div" />
        </ErrMessage>

        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </FormWrap>
    </Formik>
  );
}
