import React, { useState } from 'react';
import ReactFilestack from 'filestack-react';
import { Input } from '../../elements/Styled/StyledForm';
export default function DaTest(props) {
    const [value, setValue] = useState({
        image: '',
        multi: [],
    });

    console.log(value, 'isi dari state yang udah kita buat guys');
    const handleboot = (res) => {
        console.log(res, 'check');

        const values = res.filesUploaded[0].url;
        setValue({ ...value, image: values });
    };
    const handleCuks = (res) => {
        console.log(res, 'check');
        // var arr = [];

        // // append multiple values to the array
        // arr.push(res.filesUploaded);

        // // display all values
        // for (var i = 0; i < arr.length; i++) {
        //     console.log(arr[i]);
        // }
    };
    const PickerOptions = {
        maxFiles: 15,
    };
    return (
        <div>
            <ReactFilestack
                apikey="Av4rYp7cpRGuJZCDutq3Yz"
                onSuccess={(res) => {
                    handleboot(res);
                }}
            />
            <img src={value.image} alt={value.image} />
            {/* <ReactFilestack
                apikey="Av4rYp7cpRGuJZCDutq3Yz"
                componentDisplayMode={{
                    type: 'button',
                    customText: 'Click here to open picker',
                    customClass: 'some-custom-class',
                }}
                onSuccess={(res) => console.log(res)}
            /> */}

            <ReactFilestack
                apikey="Av4rYp7cpRGuJZCDutq3Yz"
                actionOptions={PickerOptions}
                onSuccess={(res) => {
                    handleCuks(res);
                }}
            />
        </div>
    );
}

// export default function DataPrdouctTest() {
//     return (
//         <div>
//             <Input as={DaTest} setValue={setValue} />
//         </div>
//     );
// }
