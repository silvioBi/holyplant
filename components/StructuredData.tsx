import React from 'react'

const StructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HolyPlant",
        "description": "HolyPlant connects plant owners with passionate plant sitters.",
        "url": "https://www.holyplant.net",
        // "logo": "https://www.holyplant.net/logo.png", // You'll need to create this logo
        // "sameAs": [
        //     "https://www.facebook.com/holyplant",
        //     "https://www.instagram.com/holyplant",
        //     "https://www.twitter.com/holyplant"
        // ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

export default StructuredData