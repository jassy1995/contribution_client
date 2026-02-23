import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white shadow border border-gray-200 rounded-[1.2rem] transition-all duration-300',
        className,
        {
          'hover:scale-[1.01] hover:-translate-y-1 cursor-pointer': hover,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  hover: PropTypes.bool,
};

export default Card;
