import React, { useEffect } from 'react';

const DisableInspect = () => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'I') {
                event.preventDefault(); // Prevent default action (Inspect Element)
                // Optionally, display a message or take other actions
                alert('Inspect Element is disabled.');
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null; // This component doesn't render anything visible
};

export default DisableInspect;
