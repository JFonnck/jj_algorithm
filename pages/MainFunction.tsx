import { Button, Card, Col, Container, Row, Table, Text, Textarea } from "@nextui-org/react"
import { FC, useState } from "react"


interface Props {

}

interface Dato {
    key: string,
    valueRumbo: string,
    valueBuzamiento: string,
}

const MainFunction: FC<Props> = (props: Props) => {


    const [mainInput, setMainInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inputList, setInputList] = useState<string[]>([]);
    const [rta, setRta] = useState<null | boolean>(null);
    const [outputList, setOutputList] = useState<Dato[]>([]);


    const [keys, setKeys] = useState('');
    const [valuesR, setValuesR] = useState('');
    const [valuesB, setValuesB] = useState('');


    function setDato(key: string, valueR: number | string, valueB: number | string): Dato {

        let dato = {
            key: key,
            valueRumbo: valueR + '',
            valueBuzamiento: valueB + '',
        }

        return dato;
    }

    function tieneNumero(cadena: string) {
        return cadena.includes(
            '1' || '2' ||
            '3' || '4' ||
            '5' || '6' ||
            '7' || '8' ||
            '9'
        );
    }

    function coincide(rumbo: string, buzamiento: string): boolean {
        /* console.log(rumbo);
        console.log(buzamiento); */

        return rumbo.includes(buzamiento.charAt(buzamiento.length - 1));
    }


    function calcularRumbo(rumbo: string, buzamiento: string): number {

        let result: number = 0;

        switch (rumbo.length) {
            case 4:
                if (rumbo.includes('.')) {
                    return 0;
                } else {
                    let letras4 = rumbo.charAt(0) + rumbo.charAt(3);
                    let numero4 = rumbo.charAt(1) + rumbo.charAt(2)

                    /* console.log(letras4);
                    console.log(numero4);

                    console.log(letras4.includes('N') && letras4.includes('S'));
                    console.log(letras4.includes('E') && letras4.includes('W')); */

                    if (letras4.includes('N') && letras4.includes('S')) {

                        if (buzamiento.includes('W')) {
                            return 180;
                        } else if (buzamiento.includes('E')) {
                            return 0;
                        }
                        return 0;
                    } else if (letras4.includes('E') && letras4.includes('W')) {
                        if (buzamiento.includes('N')) {
                            return 270;
                        } else if (buzamiento.includes('S')) {
                            return 90
                        } else {
                            return 0
                        }
                    } else {
                        if (coincide(rumbo, buzamiento)) {
                            return Number(numero4);
                        } else {
                            return 360 - Number(numero4);
                        }
                    }
                }

            case 3:

                let letras3 = rumbo.charAt(0) + rumbo.charAt(2);
                let numero3 = rumbo.charAt(1);

                if (letras3.includes('N') && letras3.includes('S')) {

                    if (buzamiento.includes('W')) {
                        return 180;
                    } else if (buzamiento.includes('E')) {
                        return 0;
                    }
                    return 0;
                } else if (letras3.includes('E') && letras3.includes('W')) {
                    if (buzamiento.includes('N')) {
                        return 270;
                    } else if (buzamiento.includes('S')) {
                        return 90
                    }
                } else {
                    if (coincide(rumbo, buzamiento)) {
                        return Number(numero3);
                    } else {
                        return 360 - Number(numero3);
                    }
                }

            case 2:

                let letras = rumbo.charAt(0) + rumbo.charAt(2);
                if (letras.includes('N') && letras.includes('S')) {

                    if (buzamiento.includes('E')) {
                        return 0;
                    } else if (buzamiento.includes('W')) {
                        return 180;
                    }

                } else if (letras.includes('W') && letras.includes('E')) {

                    if (buzamiento.includes('N')) {
                        return 270;
                    } else if (buzamiento.includes('S')) {
                        return 90;
                    }
                }

            default: return result;
        }

    }

    const calcularBuzamiento = (buzamiento: string): number => {
        let result: number = 0;

        switch (buzamiento.length) {
            case 3:

                let numero3 = buzamiento.charAt(0) + buzamiento.charAt(1);
                let letra3 = buzamiento.charAt(2);

                return Number(numero3);


            case 2:

                let numero2 = buzamiento.charAt(0);
                let letra2 = buzamiento.charAt(1);

                if (tieneNumero(buzamiento)) {
                    return Number(numero2);
                } else {
                    return 0;
                }

            default:
                return result;
        }
    }


    const transformInput = () => {

        if (mainInput !== '') {

            let mainInputSplit: string[] = mainInput.split(',');
            let mainOutputList: Dato[] = [];

            setInputList(mainInputSplit);
            console.log(mainInputSplit);

            console.log('Horizontales'.split('/'));

            mainInputSplit.map((item: string) => {

                let splitInput: string[] = item.split('/');

                let rumbo = splitInput[0];
                let buzamiento = splitInput[1] ? splitInput[1] : '';

                mainOutputList.push(setDato(item, calcularRumbo(rumbo, buzamiento), calcularBuzamiento(buzamiento)));

            })

            console.log(mainOutputList);
            setOutputList(mainOutputList);

        }
        else {
            setErrorMessage("MUST TO INTRODUCE AN INPUT VALUE");
        }
    }





    const print = (key: number) => {

        let keysript: string = '';
        let valueRsript: string = '';
        let valueBsript: string = '';

        outputList.map((item: Dato) => {
            if (key == 0) {
                keysript += `${item.key}\n`;
                setKeys(JSON.stringify(outputList));
            } else if (key == 1) {
                valueRsript += `${item.valueRumbo}\n`;
                setKeys(valueRsript);
            } else {
                valueBsript += `${item.valueBuzamiento}\n`;
                setKeys(valueBsript);
            }
        })
    }


    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="w-100 mt-5">
                    <div className="row">
                        <div>
                            <div className="d-flex justify-content-center mb-3">
                                {errorMessage !== '' && <h2 style={{ color: 'red' }}>{errorMessage}</h2>}
                            </div>
                            <div>
                                {inputList.length > 0 &&
                                    <h3>No. de entradas {inputList.length}</h3>
                                }
                            </div>
                            <Card>
                                <Card.Body>
                                    <div className="p-3">
                                        <Textarea
                                            placeholder="INSERT THE INPUT VALUE"
                                            rows={15}
                                            css={{ width: '100%', height: 'auto' }}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setMainInput(e.target.value);
                                                setErrorMessage('');
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Row className="mt-5 mb-5 d-flex justify-content-center">
                            <div className="row d-flex justify-content-between flex-row">
                                <Button className="m-2" onClick={() => transformInput()} >
                                    RUN
                                </Button>
                                <Button className="m-2" onClick={() => print(0)} >
                                    PRINT RESULT
                                </Button>
                                <Button className="m-2" onClick={() => { setKeys(''), setOutputList([]) }} >
                                    CLEAN UP
                                </Button>
                                <Button className="m-2" onClick={() => { setKeys(''), setOutputList([]) }} >
                                    <a href="https://www.convertcsv.com/json-to-csv.htm" target="_blank" rel="noreferrer" >GO TO CSV</a>
                                </Button>
                            </div>
                        </Row>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <div className="w-100 d-flex justify-content-center">
                                <Card>
                                    <Card.Body>
                                        <div className="p-3">

                                            <Table
                                                aria-label="Example table with static content"
                                                css={{
                                                    height: "auto",
                                                    minWidth: "100%",
                                                }}
                                            >
                                                <Table.Header>
                                                    <Table.Column>ID</Table.Column>
                                                    <Table.Column>INPUT</Table.Column>
                                                    <Table.Column>VALUE_RUMBO</Table.Column>
                                                    <Table.Column>VALUE_BUZAMIENTO</Table.Column>
                                                </Table.Header>
                                                <Table.Body>
                                                    {
                                                        outputList.map((item: Dato, index) => (
                                                            <Table.Row key={index}>
                                                                <Table.Cell>
                                                                    <Text>
                                                                        {index}
                                                                    </Text>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Text>
                                                                        {item.key}
                                                                    </Text>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Text>
                                                                        {item.valueRumbo}
                                                                    </Text>
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <Text>
                                                                        {item.valueBuzamiento}
                                                                    </Text>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))
                                                    }
                                                </Table.Body>
                                            </Table>

                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <div className="w-100 d-flex justify-content-center">
                                <Card>
                                    <Card.Body>
                                        <div className="p-3">

                                            {/* <Text>
                                                {keys}
                                            </Text> */}
                                            <Textarea
                                                placeholder="OUTPUT VALUES"
                                                rows={50}
                                                css={{ width: '100%', height: 'auto' }}
                                                value={keys}
                                            />

                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainFunction;
