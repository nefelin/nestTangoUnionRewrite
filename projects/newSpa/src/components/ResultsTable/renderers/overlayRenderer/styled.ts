import styled, { keyframes } from 'styled-components';

export const LoadingLayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0;
  width: 100%;
  height: 100%;
`

export const LoadingMoreLayer = styled.div`
  pointer-events: none;
  background: rgba(32, 60, 94, 0.3);
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`

export const LoadingMoreText = styled.span`
  color: #fff;
  margin-right: 5px;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div<{small?: boolean}>`
  display: inline-block;
  border-radius: 100%;
  margin: 2px;
  border: 2px solid #0696d7;
  border-bottom-color: transparent;
  width: ${props => (props.small ? 12 : 22)}px;
  height: ${props => (props.small ? 12 : 22)}px;
  animation: ${rotate} 0.75s linear infinite;
`