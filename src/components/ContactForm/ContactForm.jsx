import React from 'react';
import { useForm } from 'react-hook-form';

export const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValuers: {
      name: '',
      number: '',
    },
  });
  // const onSubmit = data => {
  //   console.log(data);
  // };

  console.log(errors);

  // console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        autoComplete="off"
        {...register('name', {
          required: 'name is a required field',
          minLength: { value: 3, message: 'min lenght is 3' },
        })}
        placeholder="Enter Name"
      />
      <p>{errors.name?.message}</p>

      <label>Number</label>
      <input
        autoComplete="off"
        {...register('number', { required: 'number is a required field' })}
        placeholder="Enter Number"
      />
      <p>{errors.number?.message}</p>

      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
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
