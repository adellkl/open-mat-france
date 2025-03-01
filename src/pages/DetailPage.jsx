import React from 'react';
import { useParams } from 'react-router-dom';
import OpenMatDetail from '../components/OpenMatDetail';

const DetailPage = () => {
    const { id } = useParams();

    return (
        <div>
            <OpenMatDetail id={id} />
        </div>
    );
};

export default DetailPage;