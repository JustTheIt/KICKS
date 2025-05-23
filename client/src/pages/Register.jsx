import React from 'react';
import { FaRegEyeSlash, FaRegEye, FaLeaf } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const allowedDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com',
  'zoho.com',
  'aol.com',
  'mail.com',
  // Add more as needed
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must be at most 50 characters')
    .matches(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces')
    .test(
      'no-leading-trailing-spaces',
      'Full name cannot have leading or trailing spaces',
      value => value && value.trim() === value
    )
    .test(
      'at-least-two-words',
      'Full name must contain at least two words',
      value => value && value.trim().split(/\s+/).length >= 2
    ),
  email: Yup.string()
    .required('Email is required')
    .test(
      'includes-at',
      'Email must include "@" symbol',
      value => value && value.includes('@')
    )
    .test(
      'ends-with-com',
      'Email must end with ".com"',
      value => value && value.endsWith('.com')
    )
    .test(
      'allowed-domain',
      'Email domain is not supported',
      value => {
        if (!value) return false;
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
      }
    )
    .email('Invalid email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must include at least one uppercase letter')
    .matches(/[a-z]/, 'Must include at least one lowercase letter')
    .matches(/[0-9]/, 'Must include at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^(98|97)\d{8}$/, 'Phone number must be a valid 10-digit Nepali number')
    .required('Phone number is required'),
  referral: Yup.string()
    .matches(/^$|^[A-Za-z0-9]{6}$/, 'Referral code must be exactly 6 alphanumeric characters')
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <section className='min-h-screen bg-neutral-cream flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-neutral-cream-dark'>
          <div className='flex flex-col items-center mb-8'>
            <Logo className="mb-6" />
            <h2 className='text-2xl font-heading font-bold text-text-primary'>Create Account</h2>
            <p className='text-text-secondary text-center mt-2'>Join our community of natural wellness seekers</p>
          </div>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              phone: '',
              referral: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
              setStatus(undefined);
              try {
                // Replace with your API call
                // await Axios.post('/api/register', values);
                setStatus({ success: 'Registration successful!' });
                resetForm();
                navigate('/login');
              } catch (error) {
                setStatus({ error: 'Registration failed. Please try again.' });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, touched, errors }) => (
              <Form className='space-y-6' noValidate>
                <div className='space-y-2'>
                  <label htmlFor='name' className='block text-sm font-medium text-text-primary'>Full Name</label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className={`input-field ${touched.name && errors.name ? 'border-red-500' : ''}`}
                    placeholder='Enter your full name'
                  />
                  <ErrorMessage name='name' component='p' className='text-red-500 text-xs mt-1' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='email' className='block text-sm font-medium text-text-primary'>Email</label>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    className={`input-field ${touched.email && errors.email ? 'border-red-500' : ''}`}
                    placeholder='Enter your email'
                  />
                  <ErrorMessage name='email' component='p' className='text-red-500 text-xs mt-1' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='password' className='block text-sm font-medium text-text-primary'>Password</label>
                  <div className='relative'>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      className={`input-field ${touched.password && errors.password ? 'border-red-500' : ''}`}
                      placeholder='Create a password'
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors'
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <ErrorMessage name='password' component='p' className='text-red-500 text-xs mt-1' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='confirmPassword' className='block text-sm font-medium text-text-primary'>Confirm Password</label>
                  <div className='relative'>
                    <Field
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      className={`input-field ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder='Confirm your password'
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors'
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <ErrorMessage name='confirmPassword' component='p' className='text-red-500 text-xs mt-1' />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='phone' className='block text-sm font-medium text-text-primary'>Phone Number</label>
                  <Field
                    type='text'
                    id='phone'
                    name='phone'
                    className={`input-field ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                    placeholder='98XXXXXXXX'
                  />
                  <ErrorMessage name='phone' component='p' className='text-red-500 text-xs mt-1' />
                </div>
                {/* <div className='space-y-2'>
                  <label htmlFor='referral' className='block text-sm font-medium text-text-primary'>Referral Code (optional)</label>
                  <Field
                    type='text'
                    id='referral'
                    name='referral'
                    className={`input-field ${touched.referral && errors.referral ? 'border-red-500' : ''}`}
                    placeholder='Enter referral code'
                  />
                  <ErrorMessage name='referral' component='p' className='text-red-500 text-xs mt-1' />
                </div> */}
                {status && status.error && <p className='text-red-500 text-xs mt-2'>{status.error}</p>}
                {status && status.success && <p className='text-green-600 text-xs mt-2'>{status.success}</p>}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full btn ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'btn-primary'}`}
                >
                  <FaLeaf className="inline-block mr-2" />
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </Form>
            )}
          </Formik>

          <p className='text-center mt-8 text-text-secondary'>
            Already have an account?{' '}
            <Link
              to={'/login'}
              className='font-medium text-primary-sage hover:text-primary-sage-dark hover:underline'
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;