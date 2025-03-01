export function ChessPieces({ className = "" }: { className?: string }) {
    return (
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* King */}
        <g transform="translate(50, 50) scale(0.8)">
          <path d="M22 42H42V62H22V42Z" fill="#111827" />
          <path d="M32 12V32M22 22H42" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
          <path d="M17 72C17 67 22 62 32 62C42 62 47 67 47 72L42 77H22L17 72Z" fill="#111827" />
          <path d="M22 77V82C12 87 12 97 12 97H52C52 97 52 87 42 82V77" stroke="#111827" strokeWidth="4" />
          <path d="M12 97H52V102H12V97Z" fill="#111827" />
        </g>
  
        {/* Queen */}
        <g transform="translate(150, 50) scale(0.8)">
          <path d="M22 42H42V62H22V42Z" fill="white" stroke="#111827" strokeWidth="2" />
          <path
            d="M17 22C17 25.866 20.134 29 24 29C27.866 29 31 25.866 31 22C31 18.134 27.866 15 24 15C20.134 15 17 18.134 17 22Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path
            d="M33 22C33 25.866 36.134 29 40 29C43.866 29 47 25.866 47 22C47 18.134 43.866 15 40 15C36.134 15 33 18.134 33 22Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path
            d="M25 12C25 14.2091 26.7909 16 29 16H35C37.2091 16 39 14.2091 39 12C39 9.79086 37.2091 8 35 8H29C26.7909 8 25 9.79086 25 12Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path
            d="M17 72C17 67 22 62 32 62C42 62 47 67 47 72L42 77H22L17 72Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path d="M22 77V82C12 87 12 97 12 97H52C52 97 52 87 42 82V77" stroke="#111827" strokeWidth="2" />
          <path d="M12 97H52V102H12V97Z" fill="white" stroke="#111827" strokeWidth="2" />
          <path d="M24 29L32 42M40 29L32 42" stroke="#111827" strokeWidth="2" />
        </g>
  
        {/* Knight */}
        <g transform="translate(250, 50) scale(0.8)">
          <path
            d="M17 87C17 77 27 77 32 67C37 57 17 52 17 32C17 12 47 12 47 32V62C47 72 42 77 42 77H22L17 87Z"
            fill="#111827"
          />
          <path d="M17 32C17 32 27 37 32 42C37 47 47 42 47 32" stroke="#111827" strokeWidth="3" />
          <path d="M32 42V62" stroke="#111827" strokeWidth="3" />
          <path d="M17 87V97H47V87" stroke="#111827" strokeWidth="3" />
          <circle cx="27" cy="27" r="3" fill="white" />
        </g>
  
        {/* Rook */}
        <g transform="translate(50, 200) scale(0.8)">
          <path d="M17 32H47V77H17V32Z" fill="white" stroke="#111827" strokeWidth="2" />
          <path d="M17 22H47V32H17V22Z" fill="white" stroke="#111827" strokeWidth="2" />
          <path d="M22 22V12H27V22M37 22V12H42V22" stroke="#111827" strokeWidth="2" />
          <path d="M17 77C17 87 22 92 22 92H42C42 92 47 87 47 77" stroke="#111827" strokeWidth="2" />
          <path d="M17 92H47V97H17V92Z" fill="white" stroke="#111827" strokeWidth="2" />
        </g>
  
        {/* Bishop */}
        <g transform="translate(150, 200) scale(0.8)">
          <path d="M32 12L22 42H42L32 12Z" fill="#111827" />
          <path d="M22 42H42V62H22V42Z" fill="#111827" />
          <circle cx="32" cy="27" r="5" fill="white" />
          <path d="M17 72C17 67 22 62 32 62C42 62 47 67 47 72L42 77H22L17 72Z" fill="#111827" />
          <path d="M22 77V82C12 87 12 97 12 97H52C52 97 52 87 42 82V77" stroke="#111827" strokeWidth="4" />
          <path d="M12 97H52V102H12V97Z" fill="#111827" />
        </g>
  
        {/* Pawn */}
        <g transform="translate(250, 200) scale(0.8)">
          <path
            d="M32 22C37.5228 22 42 26.4772 42 32C42 37.5228 37.5228 42 32 42C26.4772 42 22 37.5228 22 32C22 26.4772 26.4772 22 32 22Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path
            d="M22 52C22 47 27 42 32 42C37 42 42 47 42 52L37 57H27L22 52Z"
            fill="white"
            stroke="#111827"
            strokeWidth="2"
          />
          <path d="M27 57V62C17 67 17 77 17 77H47C47 77 47 67 37 62V57" stroke="#111827" strokeWidth="2" />
          <path d="M17 77H47V82H17V77Z" fill="white" stroke="#111827" strokeWidth="2" />
        </g>
      </svg>
    )
  }
  
  