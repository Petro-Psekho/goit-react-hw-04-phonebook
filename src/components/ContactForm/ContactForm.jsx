import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    formState,
    reset,
  } = useForm({
    defaultValuers: {
      name: '',
      number: '',
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        autoComplete="off"
        {...register('name', {
          required: 'name is a required field',
          minLength: { value: 3, message: 'min lenght is 3' },
          pattern: {
            value: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            message:
              'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore dArtagnan.',
          },
        })}
        placeholder="Enter Name"
      />

      <p>{errors.name?.message}</p>

      <label>Number</label>
      <input
        autoComplete="off"
        {...register('number', {
          required: 'number is a required field',
          pattern: {
            value:
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
            message:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
          },
        })}
        placeholder="Enter Number"
      />
      <p>{errors.number?.message}</p>

      {errors.exampleRequired && <p>This field is required</p>}

      <button type="submit">Add Contact</button>
    </form>
  );
};

// import { Formik, ErrorMessage } from 'formik';
// import { object, string } from 'yup';
// import {
//   ErrMessage,
//   FormWrap,
//   FormInput,
//   InputName,
//   SubmitBtn,
// } from 'components/ContactForm/ContactForm.styled';

// const namePattern =
//   /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

// const numberPattern =
//   /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

// const schema = object().shape({
//   name: string()
//     .max(20)
//     .matches(namePattern, {
//       message:
//         "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.",
//     })
//     .required(),
//   number: string()
//     .min(3)
//     .matches(numberPattern, {
//       message:
//         'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.',
//     })
//     .required(),
// });

// export const ContactForm = ({ onSubmit }) => {
//   const initialValues = {
//     name: '',
//     number: '',
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     onSubmit(values);

//     resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={schema}
//       onSubmit={handleSubmit}
//     >
//       <FormWrap>
//         <InputName>
//           Name
//           <FormInput autoComplete="off" type="text" name="name" />
//         </InputName>

//         <ErrMessage>
//           <ErrorMessage name="name" />
//         </ErrMessage>

//         <InputName>
//           Number
//           <FormInput autoComplete="off" type="tel" name="number" />
//         </InputName>

//         <ErrMessage>
//           <ErrorMessage name="number" component="div" />
//         </ErrMessage>

//         <SubmitBtn type="submit">Add contact</SubmitBtn>
//       </FormWrap>
//     </Formik>
//   );
// };
