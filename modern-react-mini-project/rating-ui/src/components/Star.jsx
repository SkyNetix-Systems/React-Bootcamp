const Star = ({
    star,
    rating,
    hover,
    color = '#ffc107',
    ratingClick,
    hoverEnter,
    hoverLeave,
  }) => {
    return (
      <span
        role="button"
        aria-label={`Rate ${star} star`}
        tabIndex={0}
        onClick={() => ratingClick(star)}
        onMouseEnter={() => hoverEnter(star)}
        onMouseLeave={hoverLeave}
        className="star"
        style={{
          color: star <= (hover || rating) ? color : '#ccc',
          cursor: 'pointer',
          fontSize: '28px',
          transition: 'color 200ms ease-in-out',
          marginRight: '4px',
        }}
      >
        {'\u2605'}
      </span>
    );
  };
  
  export default Star;
  