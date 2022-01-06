import './RecipeSummary.css';

const RecipeSummary = ({ prepTime, calories, servings }) => {
    const getSummaryItem = (label, value, suffix = '') => {
        if (!value) return null;
        return (
            <div className='recipe-summary__item'>
                <div className='recipe-summary__item-label'>{label}</div>
                <div className='recipe-summary__item-value'>
                    {value}
                    {suffix}
                </div>
            </div>
        );
    };

    return (
        <div className='recipe-summary'>
            {getSummaryItem('Preparation Time', prepTime, ' minutes')}
            {getSummaryItem('Calories', calories)}
            {getSummaryItem('Serve', servings, ' servings')}
        </div>
    );
};
export default RecipeSummary;
