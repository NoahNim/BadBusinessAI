import { useGetStoredBadIdeasQuery } from "../../redux/app/services/api";
import { useAppSelector } from "../../redux/app/hooks";
import { Card, Container } from "react-bootstrap";

export const StoredBadIdeas = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    const { data: storedIdeasList } = useGetStoredBadIdeasQuery({});
    return (sessionUser ?
        <Container className={"d-flex flex-direction-row justify-content-start align-items-center flex-wrap"} fluid>
            {storedIdeasList?.map((idea: any) => {
                return (
                    <Card className={"d-flex flex-direction-column justify-content-center align-items-center border border-primary-subtle text-wrap"} style={{ width: "25%", height: "10%" }} key={idea.id}>
                        <Card.Body className={"overflow-y-scroll"} style={{ height: "10%" }} >
                            {idea.idea}
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
        :
        <div>
            Unauthorized, please log in or sign up.
        </div>
    )
}