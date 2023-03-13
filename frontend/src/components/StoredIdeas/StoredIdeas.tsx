import { useGetStoredBadIdeasQuery } from "../../redux/app/services/api";
import { useAppSelector } from "../../redux/app/hooks";
import { Card, Container } from "react-bootstrap";

export const StoredBadIdeas = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    const { data: storedIdeasList } = useGetStoredBadIdeasQuery({});
    return (sessionUser ?
        <Container className="text-center" fluid>
            <h1>Here's Your Stored Ideas</h1>
            <Container className={"d-flex flex-direction-row justify-content-center flex-wrap"} fluid>
                {storedIdeasList?.map((idea: any) => {
                    return (
                        <Card className={"d-flex flex-direction-column justify-content-start align-items-center border border-primary-subtle overflox-x-scroll text-wrap"} style={{ width: "30%", height: "300px", margin: "1%" }} key={idea.id}>
                            <Card.Body className={"overflow-y-scroll overflox-x-scroll p-2"} style={{ width: "99%" }}>
                                {idea.idea}
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </Container>
        :
        <div className={"d-flex flex-direction-row justify-content-center align-items-center flex-wrap fs-1"}>
            Unauthorized, please log in or sign up.
        </div>
    )
}