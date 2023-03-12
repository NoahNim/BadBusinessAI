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
                <div> {!isLoading ? <div>{badidea?.data}</div> : <div>Loading...</div>}</div>
                <Button onClick={getBadIdeaHandler}>Get A Bad Business Idea</Button>

            </div>
        </div>
    )
}