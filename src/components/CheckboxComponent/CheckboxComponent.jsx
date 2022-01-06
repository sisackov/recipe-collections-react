import { useState } from 'react';

function CheckboxComponent() {
    const [checked, setChecked] = useState(false);

    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={() => setChecked(!checked)}
        />
    );
}

export default CheckboxComponent;
