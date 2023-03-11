import Button from 'react-bootstrap/Button';
import { useGetBadIdeaMutation } from '../../redux/app/services/api';
import { useState } from 'react';

export const Home = () => {
    const [badidea, setBadIdea] = useState<any>();
    const [retrieveBadidea, { isError, isLoading }] = useGetBadIdeaMutation()

    const getBadIdeaHandler = async () => {
        try {
            const res = await retrieveBadidea("");
            if (res) {
                setBadIdea(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <div>{badidea?.data?.split("Pitch:").map((idea: string) => <div>{idea}</div>)}</div>
                <div style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}>
                    Loading
                </div>
                <Button onClick={getBadIdeaHandler}>Get A Bad Business Idea</Button>
            </div>
        </div>
    )
}