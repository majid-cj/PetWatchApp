import React, { FC } from 'react'
import SVG, { Path } from 'react-native-svg'

import { IconsProps } from './types'

export const Arabic: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <Path d='M2 15V9a6 6 0 016-6h8a6 6 0 016 6v6a6 6 0 01-6 6H8a6 6 0 01-6-6z' stroke={color} strokeWidth={1.5} />
      <Path
        d='M13 15.5v-2.8m2.857 0c.714 0 2.143 0 2.143-2.1s-1.429-2.1-2.143-2.1H13v4.2m2.857 0H13m2.857 0L18 15.5M11 15.5L9.929 13M5 15.5L6.071 13m0 0L8 8.5 9.929 13M6.07 13H9.93'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </SVG>
  )
}
