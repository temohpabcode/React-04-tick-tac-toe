import { React, useEffect, useState}  from 'react';
import Icon from './Components/Icon';
//import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import reactstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Row, Col, Card, CardBody } from 'reactstrap';
import './style.css';


const tiktacArray = new Array(9).fill("")

const App = () => {
    let [isCross, setIsCross] = useState(true),
        [winMessage, setWinMessage] = useState(""),
        [isReady, setIsReady] = useState(true),
        [position, setPosition] = useState(0),
        [currentIndex, setCurrentIndex] = useState(0)


    const playAgain = () =>{
        setIsCross(true)
        setWinMessage("")
        setIsReady(true)
        setPosition(0)
        setCurrentIndex(0)
        tiktacArray.fill("")
    }

    const findWinner = () => {  
              
        if (tiktacArray[0] === tiktacArray[1] && tiktacArray[0] === tiktacArray[2] && tiktacArray[2] ){
            setWinMessage("Yeahh!!! " + tiktacArray[0] + " Won")
        } else if (tiktacArray[3] === tiktacArray[4] && tiktacArray[3] === tiktacArray[5] && tiktacArray[5]){
            setWinMessage("Yeahh!!! " + tiktacArray[3] + " Won")
        } else if (tiktacArray[6] === tiktacArray[7] && tiktacArray[6] === tiktacArray[8] && tiktacArray[8]) {
            setWinMessage("Yeahh!!! " + tiktacArray[6] + " Won")
        } else if (tiktacArray[0] === tiktacArray[3] && tiktacArray[0] === tiktacArray[6] && tiktacArray[6]) {
            setWinMessage("Yeahh!!! " + tiktacArray[0] + " Won")
        } else if (tiktacArray[1] === tiktacArray[4] && tiktacArray[1] === tiktacArray[7] && tiktacArray[7]) {
            setWinMessage("Yeahh!!! " + tiktacArray[1] + " Won")
        } else if (tiktacArray[2] === tiktacArray[5] && tiktacArray[2] === tiktacArray[8] && tiktacArray[8]) {
            setWinMessage("Yeahh!!! " + tiktacArray[2] + " Won")
        } else if (tiktacArray[0] === tiktacArray[4] && tiktacArray[0] === tiktacArray[8] && tiktacArray[8]) {
            setWinMessage("Yeahh!!! " + tiktacArray[0] + " Won")
        } else if (tiktacArray[2] === tiktacArray[4] && tiktacArray[2] === tiktacArray[6] && tiktacArray[6]) {
            setWinMessage("Yeahh!!! " + tiktacArray[2] + " Won")
        } else {
            setWinMessage("")
        }
    }

    const play = (index) => {
        tiktacArray[index] = isCross ? "cross" : "circle"
        setIsCross(!isCross) 
    }

    useEffect(() => {
        if (winMessage) {
            return toast("C O N G R A T U L A T I O N S!!!", {type:"success"})
        }
        if (position !== currentIndex) setIsReady(false)
    }, [position, currentIndex, winMessage])

    const updatePosition = (index) => {
        position === 0 && setPosition(index+1)
        setCurrentIndex(index+1)
    }
   
    const changeItem = (index) => {
        updatePosition(index)
        if (isReady) {
            play(index)
        } else {
            if (tiktacArray[index] === "") {
                play(index)
            } else {
                return toast("This is already occuppied", {type: "error"})
            }
        }
        findWinner()
        !isTie() && toast("T I E... Play Again!!!", {type: "info"})
    }

    const isTie = () => {
        return tiktacArray.includes("")
    }
    

    return (
        <Container className="p-5">
            <ToastContainer position="bottom-center" > </ToastContainer>
            <Row>
                <Col md={6} className="offset-md-3">
                
                {
                    //TO DISPLAY THE WINNER MESSAGE
                    winMessage ? (
                        <div>
                            <div className="message">
                                <h1 className="message-title">
                                    {winMessage}
                                </h1>
                            </div>
                            <Button onClick={() => playAgain()}>Play Again</Button>
                        </div>
                    )
                    :
                    (
                        <div>
                            <div className="message">
                                <h1 className="message-title">
                                    {isReady ? 
                                            "Click pen to choose between 'X' and 'O'"
                                        :
                                            isTie() ?
                                                    isCross ? 
                                                        "Cross's Turn" 
                                                    : 
                                                        "Circle's Turn"
                                                :
                                                    "Sorry It's Tie!!!"
                                    }
                            </h1>
                            </div>
                            <Button onClick={() => playAgain()}>Play Again</Button>
                        </div>
                    )
                }
                <div className="grid">
                    {tiktacArray.map((value, index) => 
                        <Card onClick={() => changeItem(index)}>
                            <CardBody className="box">
                                <Icon choice={tiktacArray[index]}/>
                            </CardBody>
                        </Card>
                    )}
                </div>
                
                </Col>
            </Row>
        </Container>
    )
}

export default App;