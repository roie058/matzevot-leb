import NewReview from "../pages/NewReview";
import Gallery from "./Gallery";
import Review from "./Review";

const responsive = {
  0: { items: 1 },
  700: { items: 3 },
};

const ReviewDisplay = (props) => {
  const reviews = props.reviews.map((review) => {
    return (
      <Review
        key={review.name}
        rating={review.grade}
        name={review.name}
        description={review.description}
        onDragStart={(e) => e.preventDefault()}
      />
    );
  });

  return (
    <div className="display">
      <h3 className="header">ביקורות</h3>
      <Gallery
        reviews={reviews}
        height="30%"
        width="30%"
        autoPlay
        responsive={responsive}
      />
      <NewReview />
    </div>
  );
};

export default ReviewDisplay;
