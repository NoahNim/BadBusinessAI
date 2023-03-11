import { openai } from "../../redux/app/services/api"
import Button from 'react-bootstrap/Button';

export const Home = () => {

    const aiCallButtonHandler = async () => {
        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Say this is a test",
                temperature: 0,
                max_tokens: 7,
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <Button onClick={aiCallButtonHandler}>Get A Bad Business Idea</Button>
            </div>
        </div>
    )
}