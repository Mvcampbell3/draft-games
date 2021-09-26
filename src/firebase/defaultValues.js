export const defaultUser = ({
    first_name = "",
    last_name = "",
    email = "",
    id = "",
}) => {
    return {
        first_name,
        last_name,
        email,
        id,
    };
};
