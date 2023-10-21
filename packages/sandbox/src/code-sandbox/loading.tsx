import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #151515;
  color: #fff;
  z-index: 9;

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .text {
    margin-top: 22rem;
    font-size: 1rem;
    width: 100%;
    font-weight: 200;
    text-align: center;
    text-transform: capitalize;
  }

  .cube,
  .cube * {
    position: absolute;
    width: 6rem;
    height: 6rem;
  }
  .cube .sides * {
    box-sizing: border-box;
    border: 0.12rem solid white;
    border-radius: 0.25rem;
    background: rgba(255, 255, 255, 0.1);
  }

  @keyframes rotate {
    0% {
      transform: rotateX(-37.5deg) rotateY(45deg);
    }
    50% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
    100% {
      transform: rotateX(-37.5deg) rotateY(405deg);
    }
  }

  .sides {
    animation: rotate 3s ease infinite;
    animation-delay: 0.8s;
    transform-style: preserve-3d;
    transform: rotateX(-37.5deg) rotateY(45deg);
  }

  .cube .sides .top {
    animation: top-animation 3s ease infinite;
    animation-delay: 0ms;
    transform: rotateX(90deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes top-animation {
    0% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
    20% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
    100% {
      opacity: 1;
      transform: rotateX(90deg) translateZ(100px);
    }
  }
  .cube .sides .bottom {
    animation: bottom-animation 3s ease infinite;
    animation-delay: 0ms;
    transform: rotateX(-90deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes bottom-animation {
    0% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
    20% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
    100% {
      opacity: 1;
      transform: rotateX(-90deg) translateZ(100px);
    }
  }
  .cube .sides .front {
    animation: front-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(0deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes front-animation {
    0% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(96px);
    }
    20% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(96px);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg) translateZ(96px);
    }
  }
  .cube .sides .back {
    animation: back-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(-180deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes back-animation {
    0% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(96px);
    }
    20% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(96px);
    }
    100% {
      opacity: 1;
      transform: rotateY(-180deg) translateZ(96px);
    }
  }
  .cube .sides .left {
    animation: left-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(-90deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes left-animation {
    0% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(96px);
    }
    20% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(96px);
    }
    100% {
      opacity: 1;
      transform: rotateY(-90deg) translateZ(96px);
    }
  }
  .cube .sides .right {
    animation: right-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(90deg) translateZ(96px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
  }

  @keyframes right-animation {
    0% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(96px);
    }
    20% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(48px);
    }
    70% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(48px);
    }
    90% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(96px);
    }
    100% {
      opacity: 1;
      transform: rotateY(90deg) translateZ(96px);
    }
  }
`;

interface LoadingProps {
  status: string;
}

const Loading = ({ status }: LoadingProps) => (
  <LoadingWrapper>
    <div className="container">
      <div className="cube">
        <div className="sides">
          <div className="top" />
          <div className="right" />
          <div className="bottom" />
          <div className="left" />
          <div className="front" />
          <div className="back" />
        </div>
      </div>
      <div className="text">{`${status}...`}</div>
    </div>
  </LoadingWrapper>
);

export default Loading;
