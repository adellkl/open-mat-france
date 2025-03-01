import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const OpenMatCard = ({ openMat }) => {
    const {
        id,
        club_name,
        coach_name,
        city,
        date,
        start_time,
        end_time,
        discipline,
        level,
        speciality,
        image_url
    } = openMat;

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const formatTime = (timeString) => {
        return timeString.substring(0, 5);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={image_url || 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aml1JTIwaml0c3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'}
                    alt={club_name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate transition-colors duration-300 hover:text-primary-600">
                    {club_name}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 transition-colors duration-300 hover:text-primary-600">
                        <MapPinIcon className="h-5 w-5 mr-2 text-primary-600" />
                        <span>{city}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 transition-colors duration-300 hover:text-primary-600">
                        <CalendarIcon className="h-5 w-5 mr-2 text-primary-600" />
                        <span>{formatDate(date)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 transition-colors duration-300 hover:text-primary-600">
                        <ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
                        <span>{formatTime(start_time)} - {formatTime(end_time)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 transition-colors duration-300 hover:text-primary-600">
                        <UserGroupIcon className="h-5 w-5 mr-2 text-primary-600" />
                        <span>Coach: {coach_name}</span>
                    </div>
                </div>

                <div className="flex space-x-2 mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs transition-transform duration-300 hover:scale-105">
                        {discipline}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs transition-transform duration-300 hover:scale-105">
                        {level}
                    </span>
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs transition-transform duration-300 hover:scale-105">
                        {speciality}
                    </span>
                </div>

                <Link to={`/detail/${id}`} className="block">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        className="transition-transform duration-300 hover:scale-100"
                    >
                        Voir les détails
                    </Button>
                </Link>
            </div>
        </div >
    );
};

export default OpenMatCard;
