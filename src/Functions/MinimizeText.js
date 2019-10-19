import React from 'react';

const MinimizeText = (text , length) => {
        if (text.length > length) {
            return <p>{text.substring(0 , length + 1) + ' ....'}</p>
        } else {
            return <p>{text}</p>
        }
}

export default MinimizeText;