import { useEffect } from "react";
import { useGetStoredBadIdeasQuery } from "../../redux/app/services/api";
import { useAppSelector } from "../../redux/app/hooks";

export const StoredBadIdeas = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)
    const { data: storedIdeasList } = useGetStoredBadIdeasQuery({});
    return (sessionUser ?
        <div className={"d-flex flex-column justify-content-center w-90"}>
            {storedIdeasList?.map((idea: any) => {
                return (
                    <div key={idea.id}>
                        <div>
                            {idea.idea}
                        </div>
                    </div>
                )
            })}
        </div>
        :
        <div>
            Unauthorized, please log in or sign up.
        </div>
    )
}