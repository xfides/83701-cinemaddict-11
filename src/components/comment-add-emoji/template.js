export const templateCommentAddEmoji = (emoji) => {
  return `
    <input 
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emoji.name}"
      value="${emoji.name}">
    <label 
      class="film-details__emoji-label"
      for="emoji-${emoji.name}">
      <img 
        src="${emoji.pathToEmotion}"
        width="30"
        height="30"
        alt="emoji-${emoji.name}">
    </label>
  `;
};
