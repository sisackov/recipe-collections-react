import { useEffect, useState } from 'react';

function CheckboxComponent({ isChecked, updateChecked, index }) {
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        if (isChecked !== checked) {
            updateChecked(index);
        }
    }, [isChecked, checked, updateChecked, index]);

    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
        />
    );
}

export default CheckboxComponent;
