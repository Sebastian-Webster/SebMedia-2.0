import {useState} from 'react';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const useInput = (initialText = '', inputName) => {
    const [text, setText] = useState(initialText);

    const bind = {
        value: text,
        onChange: (e) => {
            setText(e.target.value)
        },
        name: inputName,
        placeholder: capitalizeFirstLetter(inputName),
        type: 'text'
    }

    return [text, bind];
}

export default useInput;