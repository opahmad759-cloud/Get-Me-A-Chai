import React from 'react'

const Footer = () => {
    // Derive the displayed copyright year so it stays current without manual updates.
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-gray-900 text-white flex items-center justify-center px-4 h-16'>
            <p className='text-center'>Copyright &copy; {currentYear} Get me A Chai - All rights reserved!</p>
        </footer>
    )
}

export default Footer