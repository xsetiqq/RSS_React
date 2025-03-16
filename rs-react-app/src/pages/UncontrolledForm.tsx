import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addUser } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import styles from './UncontrolledForm.module.css';
import { Gender } from '../types';

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries?.countries || []
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nameRef.current ||
      !ageRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current ||
      !genderRef.current ||
      !termsRef.current ||
      !countryRef.current ||
      !fileInputRef.current?.files?.[0]
    ) {
      setError('All fields, including photo, are required.');
      return;
    }

    const name = nameRef.current.value.trim();
    const age = parseInt(ageRef.current.value, 10);
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!/^[A-ZА-Я][a-zа-я]*$/.test(name)) {
      setError('The name must begin with a capital letter.');
      return;
    }

    if (isNaN(age) || age < 0) {
      setError('The age must be a positive number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email.');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must contain 1 digit, 1 uppercase letter, 1 lowercase letter, 1 special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    const file = fileInputRef.current?.files?.[0];

    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('The file must be a PNG or JPEG.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError('The file is too large (max. 2MB).');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatchData(reader.result as string);
      };
    } else {
      dispatchData('');
    }
  };

  const dispatchData = (imageBase64: string) => {
    dispatch(
      addUser({
        name: nameRef.current?.value.trim() || '',
        age: parseInt(ageRef.current?.value || '0', 10),
        email: emailRef.current?.value.trim() || '',
        password: passwordRef.current?.value || '',
        gender: (genderRef.current?.value as Gender) || Gender.Other,
        acceptTerms: termsRef.current?.checked || false,
        country: countryRef.current?.value.trim() || '',
        picture: imageBase64,
      })
    );
    setError('');
    navigate('/');
  };

  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles['form-container']}>
      <div onClick={onBack} className={styles.buttonBack}>
        ✖
      </div>
      <h2>Uncontrolled Form</h2>
      {error && <p className={styles['error-message']}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label>Name:</label>
          <input type="text" id="name" name="name" ref={nameRef} required />
        </div>

        <div className={styles['form-group']}>
          <label>Age:</label>
          <input type="number" ref={ageRef} required min="0" />
        </div>

        <div className={styles['form-group']}>
          <label>Email:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div className={styles['form-group']}>
          <label>Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        <div className={styles['form-group']}>
          <label>Confirm Password:</label>
          <input type="password" ref={confirmPasswordRef} required />
        </div>

        <div className={styles['form-group']}>
          <label>Gender:</label>
          <select ref={genderRef} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles['form-group']}>
          <label>Country:</label>
          <input type="text" ref={countryRef} list="country-list" required />
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
            ref={fileInputRef}
            accept="image/png, image/jpeg"
          />
        </div>

        <div className={styles['checkbox-group']}>
          <input type="checkbox" ref={termsRef} required />
          <label>I agree to the terms and conditions</label>
        </div>

        <button type="submit" className={styles['submit-btn']}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledFormPage;
