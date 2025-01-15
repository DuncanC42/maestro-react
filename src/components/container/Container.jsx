import './Container.css';


export const Container = ({title, containerClass ,color, children}) => {
    const containerStyle = {
        backgroundColor: color || 'rgba(0, 0, 0, 0.6)', // Default color if no prop is provided
    };

    return (
        <div className={containerClass} style={containerStyle} id="container">
            {title &&
                <h4>
                    {title}
                </h4>}
            {children}
        </div>
    );
};