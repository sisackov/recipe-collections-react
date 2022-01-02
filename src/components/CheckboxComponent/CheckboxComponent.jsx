import { /* useEffect, */ useState } from 'react';

function CheckboxComponent({ isChecked /* , updateChecked, index */ }) {
    const [checked, setChecked] = useState(false);

    // useEffect(() => {
    //     if (isChecked !== checked) {
    //         updateChecked(index);
    //     }
    // }, [isChecked, checked, updateChecked, index]);

    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={() => setChecked(!checked)}
        />
    );
}

export default CheckboxComponent;
