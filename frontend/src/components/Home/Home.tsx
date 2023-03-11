import Button from 'react-bootstrap/Button';
import { useGetBadIdeaMutation } from '../../redux/app/services/api';

export const Home = () => {

    const [badidea, { isError, isLoading }] = useGetBadIdeaMutation()

    const getBadIdeaHandler = async () => {
        try {
            const res = await badidea("");
            if (res) {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <Button onClick={getBadIdeaHandler}>Get A Bad Business Idea</Button>
                <div style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}>
                    Loading
                </div>
            </div>
        </div>
    )
}