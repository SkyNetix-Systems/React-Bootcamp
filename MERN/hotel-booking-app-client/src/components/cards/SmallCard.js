import React, { useState } from "react";
import { hotelImage } from "../../actions/hotel";

const SmallCard = ({ h }) => {
    const [showMore, setShowMore] = useState(false);

    const formattedPrice = h?.price ? `$${h.price}` : "-";

    const extraInfo = (
        <div className="mt-2">
            <p><strong>Beds:</strong> {h?.bed || "-"}</p>
            <p><strong>From:</strong> {h?.from ? new Date(h.from).toLocaleDateString() : "-"}</p>
            <p><strong>To:</strong> {h?.to ? new Date(h.to).toLocaleDateString() : "-"}</p>
            <p>{h?.content}</p>
        </div>
    );

    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={hotelImage(h)}
                        alt={h?.title || "Hotel Image"}
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{h?.title}</h5>
                        <p className="card-text text-primary">{formattedPrice}</p>

                        {showMore && extraInfo}

                        <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallCard;
