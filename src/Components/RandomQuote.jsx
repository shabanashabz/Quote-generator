import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";  // Import the heart icon from react-icons

function RandomQuote() {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleQuote = () => {
    let api = "https://dummyjson.com/quotes";
    fetch(api)
      .then((res) => res.json())
      .then((results) => {
        let random = Math.floor(Math.random() * results.quotes.length);
        setQuote(results.quotes[random]);
        console.log("the result quote is", results.quotes[random]);
      });
  };

  useEffect(() => {
    handleQuote();
  }, []);

  // Add or remove the current quote from favorites
  const toggleFavorite = () => {
    if (quote && favorites.some((fav) => fav.id === quote.id)) {
      // Remove from favorites
      setFavorites(favorites.filter((fav) => fav.id !== quote.id));
    } else {
      // Add to favorites
      setFavorites([...favorites, quote]);
    }
  };

  // Remove a specific favorite quote
  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  // Copy the quote to the clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 1500); // Clear message after 1.5 seconds
    });
  };

  return (
    <>
      <div className="quote-container text-center">
        <div className="quote-box">
          <p className="quote-text fs-4">{quote?.quote}</p>
          <div className="quote-author">{`~${quote?.author}~`}</div>

          {/* Show favorite/unfavorite button only if a quote is available */}
          {quote && (
            <button
              onClick={toggleFavorite}
              className={`btn favorite-btn ${
                favorites.some((fav) => fav.id === quote.id) ? "favorited" : ""
              }`}
            >
              {favorites.some((fav) => fav.id === quote.id) ? (
                <i class="fa-solid fa-heart text-danger"></i>
              ) : (
                <i class="fa-regular fa-heart text-danger"></i>
              )}
            </button>
          )}

          {/* Button to show/hide favorites */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="btn show-favorites-btn"
          >
            {showFavorites ? "Hide Favorites" : "Show Favorites"}
          </button>

          {/* Button to copy the quote */}
          <button
            className="btn copy-btn ms-2"
            onClick={() => copyToClipboard(`${quote.quote} ~${quote.author}`)}
          >
            <i className="fa-regular fa-copy"></i>
          </button>
          {copySuccess && (
            <span className="copy-success ms-2">{copySuccess}</span>
          )}
        </div>

        {/* Button to get a new quote */}
        <button className="btn btn-primary mt-4" onClick={handleQuote}>
          NEW QUOTE
        </button>

        {/* Display the list of favorite quotes */}
        {showFavorites && (
          <div className="favorites-modal mt-5 bg-light p-4 ">
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <p key={index} className="quote-text p-1">
                  "{fav.quote}" - {fav.author}
                  <i
                    class="fa-solid fa-trash ms-3 text-primary"
                    onClick={() => deleteFavorite(fav.id)}
                  ></i>
                </p>
              ))
            ) : (
              <p>No favorites yet!</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default RandomQuote;
