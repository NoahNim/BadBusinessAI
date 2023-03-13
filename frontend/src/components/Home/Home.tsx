import Button from 'react-bootstrap/Button';
import { useGetBadIdeaMutation, useStoreBadIdeasMutation } from '../../redux/app/services/api';
import { useState } from 'react';
import { useAppSelector } from '../../redux/app/hooks';

export const Home = () => {
    const [badidea, setBadIdea] = useState<any>();
    const [retrieveBadidea, { isError, isLoading }] = useGetBadIdeaMutation()
    const [storeBadIdea] = useStoreBadIdeasMutation();
    const sessionUser = useAppSelector((state) => state?.auth?.user)

    const getBadIdeaHandler = async () => {
        try {
            const idea = await retrieveBadidea("");
            setBadIdea(idea)
            if (sessionUser) {
                storeBadIdea({ idea, userId: sessionUser.id });
            };
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={"d-flex flex-column justify-content-center w-75 container-md align-items-center"}
            style={{ marginTop: "10%" }}
        >
            <div>
                {!isLoading && !badidea ? <div className={"d-flex flex-column justify-content-center align-items-center text-center"}><div className={"w-50"}>Click the button below to get a bad business idea. Please be aware that sometimes the AI model might generate a response it considers harmful, and in that case you will get a warning saying it can't tell you something harmful. {sessionUser ? <div>Also, since logged in each idea you generate will be put into Stored Ideas in the navigation up top.</div> : null} Enjoy!</div></div> : null}
                {!isLoading ? <div>{badidea?.data}</div> : <div className={"align-items-center"}>Loading Your Bad Idea...</div>}
            </div >
            <Button style={{ marginTop: "1%" }} onClick={getBadIdeaHandler}>{!badidea ? "Get A Bad Business Idea" : "Get Another Idea"}</Button>
        </div >
    )
}