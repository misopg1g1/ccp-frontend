import PropTypes from 'prop-types'

const icons = {
    close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    eye:
    'M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z',
    eyeClosed: [
        'M14.78 0.22c-0.293-0.293-0.768-0.293-1.061 0l-3.159 3.159c-0.812-0.246-1.671-0.378-2.561-0.378-3.489 0-6.514 2.032-8 5 0.643 1.283 1.573 2.391 2.703 3.236l-2.484 2.484c-0.293 0.293-0.293 0.768 0 1.061 0.146 0.146 0.338 0.22 0.53 0.22s0.384-0.073 0.53-0.22l13.5-13.5c0.293-0.293 0.293-0.768 0-1.061zM6.5 5c0.66 0 1.22 0.426 1.421 1.019l-1.902 1.902c-0.592-0.201-1.019-0.761-1.019-1.421 0-0.828 0.672-1.5 1.5-1.5zM1.721 8c0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 0.858 0.27 1.652 0.73 2.303l-0.952 0.952c-0.819-0.576-1.519-1.311-2.057-2.162z',
        'M12 6.906c0-0.424-0.066-0.833-0.189-1.217l-5.028 5.028c0.384 0.123 0.793 0.189 1.217 0.189 2.209 0 4-1.791 4-4z',
        'M12.969 4.531l-1.084 1.084c0.020 0.012 0.040 0.024 0.059 0.037 0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152-0.604 0-1.202-0.074-1.781-0.219l-1.201 1.201c0.933 0.335 1.937 0.518 2.982 0.518 3.489 0 6.514-2.032 8-5-0.703-1.405-1.752-2.6-3.031-3.469z'
    ]
}

const Icons = props => {
    const { color, width, height, border, icon, className, viewBox, onClick } = props
    
    const renderPath = d => {
        if (border) {
            return <path key={d} d={d} stroke={border.color} strokeWidth={border.width} />
        }
        return <path key={d} d={d} />
    }
    return (
        <svg
            fill={color}
            width={width}
            height={height}
            className={className}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            {Array.isArray(icons[icon]) && icons[icon].map(i => renderPath(i))}
            {!Array.isArray(icons[icon]) && renderPath(icons[icon])}
        </svg>
    )
}

Icons.propTypes = {
    viewBox: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    border: PropTypes.string,
    icon: PropTypes.string.isRequired,
    onclick: PropTypes.func
}

Icons.defaultProps = {
    viewBox: '0 0 24 24',
    height:'24',
    width: '24',
    border: null,
    className: null,
    color: null,
    onclick: () => ({})
}

export default Icons;