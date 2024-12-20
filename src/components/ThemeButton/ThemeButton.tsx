import React from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'

export const ThemeButton = () => {
    return (
        <div>
            <div className='flex row items-center border-2 rounded-full hover:text-green-300 hover:border-green-300'>

                theme==='dark'? <IoSunny className="m-1" /> : <IoMoon className="m-1" />
                <IoSunny className="m-1" />/
                <IoMoon className="m-1" />
            </div>
        </div>
    )
}
