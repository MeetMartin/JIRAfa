const starButton = () => {
    const starButton = $ ('<span class="jirafa-star-button">☆</span>');
    starButton.favorize = () => starButton.text ('★');
    starButton.unFavorize = () => starButton.text ('☆');
    return starButton;
};

const addEpicFavorization = () => {

};

export {
    addEpicFavorization
};