import React, { useState, useEffect, useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import debounce from 'lodash.debounce';

const Profile = ({ user, countries, cities }) => {
    const [formData, setFormData] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
        city: user.city,
        email: user.email,
        password: '',
        password_confirmation: ''
    });
    const [countryOptions, setCountryOptions] = useState(countries);
    const [cityOptions, setCityOptions] = useState(cities);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'country') {
            debouncedFetchCities(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('profile.update'), formData);
    };

    const fetchCountries = (query) => {
        axios.get(route('countries', { query }))
            .then(response => {
                setCountryOptions(response.data);
            });
    };

    const fetchCities = (countryId, query) => {
        axios.get(route('cities', { country_id: countryId, query }))
            .then(response => {
                setCityOptions(response.data);
            });
    };

    const debouncedFetchCountries = useCallback(debounce((query) => fetchCountries(query), 300), []);
    const debouncedFetchCities = useCallback(debounce((countryId) => fetchCities(countryId), 300), []);

    const handleCountrySearch = (e) => {
        const query = e.target.value;
        debouncedFetchCountries(query);
    };

    const handleCitySearch = (e) => {
        const query = e.target.value;
        debouncedFetchCities(formData.country, query);
    };

    return (
        <div>
            {/* <nav className="navbar">
                <div className="left">
                    <a href="#">Demx</a>
                    <a href="#">Find Work</a>
                    <a href="#">My Jobs</a>
                    <a href="#">Orders</a>
                    <a href="#">Gigs</a>
                    <a href="#">Messages</a>
                </div>
                <div className="right">
                    <img src={user.profile_picture} alt="Profile Picture" className="profile-pic" />
                    <span>{user.name}</span>
                    <span className="notification-icon">&#128276;</span>
                </div>
            </nav> */}

            <div className="notification-popup">
                <ul>
                    <li>Notification 1</li>
                    <li>Notification 2</li>
                    <li>Notification 3</li>
                </ul>
            </div>

            <div className="profile-container">
                <div className="profile-header">
                    <img src={user.profile_picture} alt={user.name} />
                    <div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className="tab">
                    <button className="tablinks" onClick={() => setActiveTab('Account')}>Account</button>
                    <button className="tablinks" onClick={() => setActiveTab('Security')}>Security</button>
                    <button className="tablinks" onClick={() => setActiveTab('Notification')}>Notification</button>
                </div>

                <div id="Account" className={`tab-content ${activeTab === 'Account' ? 'active' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country Name</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleCountrySearch} />
                            <select name="country" value={formData.country} onChange={handleChange}>
                                {countryOptions.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleCitySearch} />
                            <select name="city" value={formData.city} onChange={handleChange}>
                                {cityOptions.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Save</button>
                            <button type="button">Cancel</button>
                        </div>
                    </form>
                </div>

                <div id="Security" className={`tab-content ${activeTab === 'Security' ? 'active' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Save</button>
                            <button type="button">Cancel</button>
                        </div>
                    </form>
                </div>

                <div id="Notification" className={`tab-content ${activeTab === 'Notification' ? 'active' : ''}`}>
                    <p>Notification settings content goes here.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;