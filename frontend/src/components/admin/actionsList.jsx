import React from 'react'
import CircularGallery from '../animated/list'
const ActionsList = () => {
    const items = [
        { image: '/useIcon.png', text: 'Users' },
        { image: '/blog.png', text: 'Blogs' },
        { image: '/chat.png', text: 'Chats' },
    ]
    return (
        <div>
            <h2>ActionsList</h2>
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery items={items} bend={3} textColor="#ffd700" borderRadius={0.05} scrollEase={0.02} scrollSpeed={1}/>
            </div>
        </div>
    )
}

export default ActionsList