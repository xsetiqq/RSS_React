import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addUser } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/HookForm.module.css';
import { Gender } from '../types';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptTerms: boolean;
  country: string;
  picture: FileList;
}

const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-ZА-Я][a-zа-я]*$/,
      'The name must begin with a capital letter.'
    )
    .required('Name Required.'),
  age: yup
    .number()
    .min(0, 'Age cant be a negative.')
    .required('Age is a must.'),
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
      'The password must contain 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
    )
    .required('The password is mandatory.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords dont match.')
    .required('Password confirmation is mandatory.'),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), 'Choose a gender.')
    .required('Gender is mandatory.'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions.')
    .required(),
  country: yup.string().required('Select a country.'),
  picture: yup
    .mixed<FileList>()
    .test('fileSize', 'The file is too large (max. 2MB).', (value) => {
      if (!value || !(value as FileList).length) return false;
      return (value as FileList)[0].size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'The file must be a PNG or JPEG.', (value) => {
      if (!value || !(value as FileList).length) return false;
      return ['image/png', 'image/jpeg'].includes((value as FileList)[0].type);
    })
    .required('Photo uploading is mandatory'),
});

const HookFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    const file = data.picture[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(addUser({ ...data, picture: reader.result as string }));
        navigate('/');
      };
    } else {
      dispatch(addUser({ ...data, picture: '' }));
      navigate('/');
    }
  };

  return (
    <div className={styles['form-container']}>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-group']}>
          <label>Name:</label>
          <input type="text" {...register('name')} />
          {errors.name && (
            <p className={styles['error-message']}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label>Age:</label>
          <input type="number" {...register('age')} />
          {errors.age && (
            <p className={styles['error-message']}>{errors.age.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && (
            <p className={styles['error-message']}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && (
            <p className={styles['error-message']}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label>Confirm password:</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className={styles['error-message']}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label>Gender:</label>
          <select {...register('gender')}>
            <option value={Gender.Male}>Мужской</option>
            <option value={Gender.Female}>Женский</option>
            <option value={Gender.Other}>Другое</option>
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Country:</label>
          <input type="text" list="country-list" {...register('country')} />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>

        <div className={styles['form-group']}>
          <label>Photo:</label>
          <input
            type="file"
            {...register('picture')}
            accept="image/png, image/jpeg"
          />
          {errors.picture && (
            <p className={styles['error-message']}>{errors.picture.message}</p>
          )}
        </div>

        <div className={styles['checkbox-group']}>
          <input type="checkbox" {...register('acceptTerms')} />
          <label>I agree to the terms and conditions</label>
          {errors.acceptTerms && (
            <p className={styles['error-message']}>
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`${styles['submit-btn']} ${isValid ? styles.valid : ''}`}
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookFormPage;
