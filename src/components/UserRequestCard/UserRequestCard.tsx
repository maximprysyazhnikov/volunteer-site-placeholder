import './UserRequestCard.scss';

type Props = {
  city: string;
  category: string;
  title: string;
  description: string;
  status: string;
};

export const UserRequestCard = ({
  city,
  category,
  title,
  description,
  status,
}: Props) => {
  return (
    <div className="user-request-card">
      <div className="user-request-card__header">
        <span className="user-request-card__city">{city}</span>
        <span className="user-request-card__category">{category}</span>
      </div>

      <h3 className="user-request-card__title">{title}</h3>
      <p className="user-request-card__description">{description}</p>

      <div className="user-request-card__status">
        {status}
      </div>

      <div className="user-request-card__actions">
        <button className="user-request-card__edit">Edit Request</button>
        <button className="user-request-card__view">View Details</button>
      </div>
    </div>
  );
};
