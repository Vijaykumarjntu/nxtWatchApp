import styled from 'styled-components'

export const Heading = styled.h1`
    background-color:${props => (props.isLight ? '#ffffff' : '#000000')},
    color:${props => (props.isLight ? '#000000' : '#ffffff')},
    font-size:120%,
`
