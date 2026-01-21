import { useRef, useState } from 'react';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  return score;
}

function getStrengthLabel(score) {
  if (score <= 1) return 'Faible';
  if (score === 2) return 'Moyen';
  if (score === 3) return 'Bon';
  return 'Fort';
}

function getStrengthColor(score) {
  if (score <= 1) return '#ef4444';
  if (score === 2) return '#f59e0b';
  if (score === 3) return 'var(--color-gold)';
  return 'var(--color-gold-strong)';
}

function mapServerErrorToFields(message) {
  if (!message) return {};
  const normalized = message.toLowerCase();
  const nextErrors = {};

  if (normalized.includes('email')) {
    nextErrors.email = message;
  }
  if (normalized.includes('pseudo') || normalized.includes('username')) {
    nextErrors.username = message;
  }
  if (normalized.includes('mot de passe') || normalized.includes('password')) {
    nextErrors.password = message;
  }

  return nextErrors;
}

function validate(values) {
  const nextErrors = { username: '', email: '', password: '', confirmPassword: '' };
  const username = values.username.trim();
  const email = values.email.trim();
  const password = values.password;
  const confirmPassword = values.confirmPassword;

  if (!username) {
    nextErrors.username = 'Le pseudo est requis.';
  } else {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      nextErrors.username = 'Pseudo invalide: 3 a 20 caracteres, lettres/chiffres/underscore.';
    }
  }

  if (!email) {
    nextErrors.email = 'Email requis.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      nextErrors.email = 'Email invalide.';
    }
  }

  if (!password) {
    nextErrors.password = 'Mot de passe requis.';
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      nextErrors.password =
        'Mot de passe: 8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.';
    }
  }

  if (!confirmPassword) {
    nextErrors.confirmPassword = 'Confirmation requise.';
  } else if (confirmPassword !== password) {
    nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }

  return nextErrors;
}

export default function useRegisterForm({ handleRegister, error, onSuccess }) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const fieldRefs = {
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  function onChange(e) {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    setFieldErrors(validate(nextForm));
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function onPasswordKey(event) {
    if (event.getModifierState) {
      setCapsLockOn(event.getModifierState('CapsLock'));
    }
  }

  function focusFirstInvalid(errors) {
    const firstInvalidField = ['username', 'email', 'password', 'confirmPassword'].find(
      (field) => errors[field]
    );
    if (firstInvalidField && fieldRefs[firstInvalidField]?.current) {
      fieldRefs[firstInvalidField].current.focus();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    setTouched({ username: true, email: true, password: true, confirmPassword: true });

    if (Object.values(errors).some(Boolean)) {
      focusFirstInvalid(errors);
      return;
    }

    try {
      const payload = {
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      };
      await handleRegister(payload);
      onSuccess();
    } catch (err) {
      const serverFieldErrors = mapServerErrorToFields(err?.message);
      if (Object.keys(serverFieldErrors).length) {
        setFieldErrors((prev) => ({ ...prev, ...serverFieldErrors }));
        setTouched((prev) => ({
          ...prev,
          ...Object.keys(serverFieldErrors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        }));
        focusFirstInvalid(serverFieldErrors);
      }
    }
  }

  const hasClientErrors = Object.values(fieldErrors).some(Boolean);
  const hasTouched = Object.values(touched).some(Boolean);
  const showErrorState = Boolean(error) || (hasClientErrors && hasTouched);
  const errorFields = Object.entries(fieldErrors)
    .filter(([field, message]) => Boolean(message) && touched[field])
    .map(([field]) => field);
  const fieldLabelMap = {
    username: 'Pseudo',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmation',
  };
  const fieldList =
    hasClientErrors && hasTouched
      ? errorFields.map((field) => fieldLabelMap[field]).filter(Boolean)
      : [];
  const formAlert = error || (fieldList.length ? `Champs en erreur: ${fieldList.join(', ')}.` : '');

  const passwordStrength = getPasswordStrength(form.password);
  const strengthLabel = getStrengthLabel(passwordStrength);
  const strengthColor = getStrengthColor(passwordStrength);
  const isPasswordStrongEnough = passwordStrength >= 2;
  const isFormValid = !Object.values(validate(form)).some(Boolean) && isPasswordStrongEnough;

  return {
    form,
    fieldErrors,
    touched,
    showPassword,
    setShowPassword,
    capsLockOn,
    fieldRefs,
    onChange,
    onBlur,
    onPasswordKey,
    onSubmit,
    formAlert,
    showErrorState,
    isFormValid,
    passwordStrength,
    strengthLabel,
    strengthColor,
  };
}
