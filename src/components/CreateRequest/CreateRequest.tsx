import './CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';

export const CreateRequest = () => {
  return (
    <div className="create-request">
      <div className="create-request__header">
        <button className="create-request__back">
          <img src={breakIcon} alt="back icon" />
          Back to My Requests
        </button>

        <h1 className="create-request__title">Create New Request</h1>
      </div>

      <form className="create-request__form">
        <div className="create-request__field">
          <label className="create-request__label">Title</label>
          <input
            className="create-request__input"
            placeholder="Add title here..."
          />
          <span className="create-request__hint">Max length ~80 characters</span>
        </div>

        <div className="create-request__field">
          <label className="create-request__label">Category</label>
          <select className="create-request__input">
            <option>Choose a category</option>
          </select>
        </div>

        <div className="create-request__field">
          <label className="create-request__label">City</label>
          <select className="create-request__input">
            <option>Choose a city</option>
          </select>
        </div>

        <div className="create-request__field">
          <label className="create-request__label">Description</label>
          <textarea
            className="create-request__textarea"
            placeholder="Provide details about your request..."
          />
          <span className="create-request__hint">Character limit: 500–1000</span>
        </div>

        <div className="create-request__actions">
          <button type="button" className="create-request__cancel">
            Cancel
          </button>
          <button type="submit" className="create-request__publish">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
