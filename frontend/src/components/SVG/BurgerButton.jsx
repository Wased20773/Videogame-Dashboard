const BurgerButton = ({ height, stroke }) => {
  return (
    <svg
      className="burger-container"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M4 18L20 18"
          stroke="#ffffffff"
          strokeWidth={stroke}
          strokeLinecap="round"
        ></path>
        <path
          d="M4 12L20 12"
          stroke="#ffffffff"
          strokeWidth={stroke}
          strokeLinecap="round"
        ></path>
        <path
          d="M4 6L20 6"
          stroke="#ffffffff"
          strokeWidth={stroke}
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
};

export default BurgerButton;
