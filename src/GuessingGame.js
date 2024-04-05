import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./GuessingGame.module.css";

const GuessingGame = () => {

    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("Start Guessing");
    const [randomNumber, setRandomNumber] = useState(null);
    const [timesGuessed, setTimesGuessed] = useState(null);

    useEffect(() => {

        if (randomNumber === null) {
            setRandomNumber(
                JSON.parse(localStorage.getItem("random")) || generateNum()
            );
        }

        if (timesGuessed === null) {
            setTimesGuessed(JSON.parse(localStorage.getItem("guesses")) || 0);
        }

    }, [])

    function generateNum() {
        let random = Math.floor(Math.random() * 100)

        localStorage.setItem("random", JSON.stringify(random))

        return random;
    }

    function handleSubmit(event) {
        event.preventDefault();

        let parsedNum = parseInt(guess);

        console.log(parsedNum);
        console.log(randomNumber)

        if (parsedNum === randomNumber) {
            setMessage("Congratulations! You guessed the lucky number!")
        } else if (parsedNum > randomNumber) {
            setMessage ("Your guess is too high!")
        } else {
            setMessage ("Your guess is too low!")
        }

        setTimesGuessed(timesGuessed + 1);
        localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));

    }


    function handleChange(event) {
        
        if (!isNaN(event.target.value)) {
            setGuess(event.target.value);
        } else {
            alert("Please type a number.");
        }
    }

    function reset() {
        setGuess("");
        setMessage("Start Guessing!");
        setTimesGuessed(0);
        setRandomNumber(generateNum());
        localStorage.removeItem("guesses")
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" style={{textAlign: "center"}}>
                <Form.Label>
                    I am thinking of a number between 1 and 100. Guess the lucky number!
                </Form.Label>
                    <br/>
                <Form.Label>You have made {timesGuessed} guesses</Form.Label>
                <Form.Control style={{width: "25%", margin: "0 auto"}}
                    type="text"
                    onChange={handleChange}
                    value={guess}
                    name="name"
                />

                <Button style={{margin: "10px"}} type="submit">Guess</Button>
                <br/>
                <Button style={{marginBottom: "10px"}} onClick={reset} type="button">Reset</Button>
                <br/>
                <Form.Label>{message}</Form.Label>
            </Form.Group>
        </Form>
        </>
    )



};

export default GuessingGame;