import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import ApplicationLogo from '@/Components/ApplicationLogo'; // Import your ApplicationLogo
import GuestLayout from '@/Layouts/GuestLayout'; // Import GuestLayout

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree_to_terms: false,
        user_type: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                toast.success('Registered successfully! Please verify your email.');
                setTimeout(() => {
                    window.location.href = route('verification.notice');
                }, 2000);
            },
            onError: () => {
                toast.error('Registration failed. Please check your details and try again.');
            },
        });
    };

    return (
        <GuestLayout>
            <div className="flex flex-col min-h-screen bg-gray-100 relative overflow-hidden">
                <Head title="Register" />
                <ToastContainer />

                {/* <div className="text-center mt-8">
                    <ApplicationLogo /> Use your ApplicationLogo component
                    <h1 className="text-3xl font-bold mt-4">Join Us Today!</h1>
                    <p className="text-lg text-gray-600">Create your account to access our services.</p>
                </div> */}

                {/* Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0.3, scale: 0.7 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-blue-400 w-48 h-48 rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0.3, scale: 0.7 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-green-400 w-64 h-64 rounded-full absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 opacity-30"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0.3, scale: 0.7 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-pink-400 w-32 h-32 rounded-full absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0.3, scale: 0.7 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-purple-400 w-40 h-40 rounded-full absolute bottom-1/4 left-1/4 transform translate-x-1/2 translate-y-1/2 opacity-30"
                    ></motion.div>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow">
                    <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg z-10 relative">
                        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                        <p className="text-center mb-6 text-gray-600">Fill in the details below to get started.</p>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <InputLabel htmlFor="first_name" value="First Name" />
                                    <TextInput
                                        id="first_name"
                                        name="first_name"
                                        value={data.first_name}
                                        className="mt-1 block w-full"
                                        autoComplete="given-name"
                                        isFocused={true}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>
                                <div className="flex-1">
                                    <InputLabel htmlFor="last_name" value="Last Name" />
                                    <TextInput
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        className="mt-1 block w-full"
                                        autoComplete="family-name"
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>
                            </div>

                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />

                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />

                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />

                            <InputLabel htmlFor="user_type" value="I am a" />
                            <select
                                id="user_type"
                                name="user_type"
                                value={data.user_type}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                onChange={(e) => setData('user_type', e.target.value)}
                                required
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="service_seeker">Client</option>
                                <option value="service_provider">Service Provider</option>
                                {/* <option value="recruiter">Recruiter</option> */}
                            </select>
                            <InputError message={errors.user_type} className="mt-2" />

                            <div className="flex items-center">
                                <input
                                    id="agree_to_terms"
                                    type="checkbox"
                                    name="agree_to_terms"
                                    className="mr-2"
                                    onChange={(e) => setData('agree_to_terms', e.target.checked)}
                                    required
                                />
                                <label htmlFor="agree_to_terms" className="text-gray-600">I agree to the terms and conditions</label>
                            </div>
                            <InputError message={errors.agree_to_terms} className="mt-2" />

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
