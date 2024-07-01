import { BoxedAccordion, BoxedAccordionItem, ButtonDanger, Row, RowList, Select, TextField } from "@telefonica/mistica";
import { useState } from "react";
import { DataTypes } from "../../models/Method";

export default function Parameters() {

    const [index, setIndex] = useState<Array<number>>([0])

    return (
        <BoxedAccordion
            singleOpen
            index={index}
            style={{
                backgroundColor: 'red'
            }}
            onChange={(item, value) => {
                if (value) {
                    setIndex([...index, item])
                } else {
                    index.splice(index.indexOf(item), 1);
                    setIndex([...index]);
                }
            }}
        >
            <div style={{
                backgroundColor: 'red'
            }}>
            <BoxedAccordionItem
                title="Parameters"
                content={
                    <div style={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent:  'flex-end', 
                        alignItems: 'flex-end', 
                        backgroundColor: 'lightgray'
                        }}>
                         <TextField label={"Name"} name={"Name"} value={'idade'} />
                         <Select
                            name="param-type"
                            value={''}
                            //onChangeValue={val => setMethod({... method, returnType: val})}
                            label={"type"}
                            options={DataTypes}
                        />
                        <ButtonDanger  onPress={() => console.log('removing')}>Remove</ButtonDanger>
                    </div>

                }
            >

            </BoxedAccordionItem>
            </div>

        </BoxedAccordion>
    )

    
}

const Popup = () => {
    return (
      <div className="popup">
        <h2>Popup Content</h2>
        <button onClick={() => console.log('closing')}>Close</button>
      </div>
    );
  };